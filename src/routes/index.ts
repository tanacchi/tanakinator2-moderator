import * as express from 'express';
import { STATUS_PATTERN } from '../constants/status';
import { progressStore } from "../models/progress";
import { ProgressSimple, ProgressDetail, ProgressPost } from "../types/progressType";

const router: express.Router = express.Router();

router.get('/', async (req, res, next) => {
  const results: Array<ProgressSimple> = await progressStore.getAll();
  res.status(200).json({ results });
});

router.post('/:id', async (req, res, next) => {
  const userId: string = req.params.id;
  const diff: ProgressPost = {
    device: req.body.device,
    status: req.body.status,
    newQuestion: req.body.newQuestion,
  }
  if (!STATUS_PATTERN.includes(diff.status)) {
    res.status(400).send("Invalid status.");
    return;
  }
  progressStore.set(userId, diff);
  res.status(204).send()
})

router.get('/:id', async (req, res, next) => {
  const result: ProgressDetail = await progressStore.get(req.params.id);
  res.status(200).json({
    result
  })
})


export default router;
