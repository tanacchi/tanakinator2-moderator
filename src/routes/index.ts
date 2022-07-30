'use strict'

import * as express from 'express';
import { progressStore } from "../models/progress";
import { ProgressSimple, ProgressDetail, ProgressPost } from "../types/progressType";

const router: express.Router = express.Router();

router.get('/', async (req, res, next) => {
  const results: Array<ProgressSimple> = await progressStore.getAll();
  res.status(200).json({ results });
});

router.post('/', async (req, res, next) => {
  const userId: string = req.body.userId;
  const device: string = req.body.device;
  progressStore.set(userId, device);
  res.status(204).send()
})

router.get('/:id', async (req, res, next) => {
  const result: ProgressDetail = await progressStore.get(req.params.id);
  res.status(200).json({
    result
  })
})


export default router;
