'use strict'

import * as express from 'express';
import { progressStore } from "../models/progress";

const router = express.Router();

router.get('/', async (req, res, next) => {
  const results = await progressStore.getAll();
  res.status(200).json({ results });
});

router.post('/', async (req, res, next) => {
  const userId = req.body.userId;
  const device = req.body.device;
  progressStore.set(userId, device);
  res.status(204).send()
})

router.get('/:id', async (req, res, next) => {
  const value = await progressStore.get(req.params.id);
  res.status(200).json({
    value,
  })
})


export default router;
