import * as express from "express";
import { STATUS_PATTERN } from "../constants/status";
import { progressStore } from "../models/progress";
import {
  ProgressSimple,
  ProgressDetail,
  ProgressPost,
} from "../types/progressType";

const router: express.Router = express.Router();

/**
 * @swagger
 * /api/progress/:
 *   get:
 *     description: 全ユーザのプログレスのサマリを取得.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: アナタの名前
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: nameにJohnを指定した場合、挨拶を返す
 *         examples:
 *           result:
 *              message: Hello Jon!
 *              yourName: John
 */
router.get("/", async (req, res) => {
  const results: Array<ProgressSimple> = await progressStore.getAll();
  res.status(200).json({ results });
});

/**
 * @swagger
 * parameter:
 *   userIdPathParam:
 *     in: path
 *     name: id
 *     description: ユーザーID
 *     required: true
 *     type: string
 */
/**
 * @swagger
 * /api/progress/{id}:
 *   post:
 *     description: プログレスを更新.
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/userIdPathParam'
 *     responses:
 *       204:
 *         description: 正常に更新.
 *       400:
 *         description: status の値が不正など.
 */
router.post("/:id", async (req, res) => {
  const userId: string = req.params.id;
  const diff: ProgressPost = {
    device: req.body.device,
    status: req.body.status,
    newQuestion: req.body.newQuestion,
  };
  if (!STATUS_PATTERN.includes(diff.status)) {
    res.status(400).send("Invalid status.");
    return;
  }
  progressStore.set(userId, diff);
  res.status(204).send();
});

/**
 * @swagger
 * /api/progress/{id}:
 *   get:
 *     description: ID 指定でプログレスを取得.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ユーザーID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 該当するユーザのプログレスの詳細情報を返す.
 *         examples:
 *           result:
 *              userId: test_1682930311994
 *              device: web
 *              status: asking
 *              questions: [2, 4]
 *              answers: [0, 1]
 */
router.get("/:id", async (req, res) => {
  const result: ProgressDetail = await progressStore.get(req.params.id);
  res.status(200).json({
    result,
  });
});

export default router;
