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
 * 進行状況サマリの全件取得
 * @returns {Array<ProgressSimple>} 進行状況サマリのリスト
 */
router.get("/", async (req, res) => {
  const results: Array<ProgressSimple> = await progressStore.getAll();
  res.status(200).json({ results });
});

/**
 * ユーザの進行状況を登録
 * @param {string} ユーザ ID
 * @returns {string} 完了メッセージ
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
 * ユーザの進行状況詳細を取得
 * @param {string} ユーザ ID
 * @returns {ProgressDetail} 進行状況詳細
 */
router.get("/:id", async (req, res) => {
  const result: ProgressDetail = await progressStore.get(req.params.id);
  res.status(200).json({
    result,
  });
});

export default router;
