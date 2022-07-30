const express = require('express');
const router = express.Router();
const redisClient = require('../models/progress');


router.get('/', async (req, res, next) => {
  await redisClient.getAll();
  res.status(200).json({
    message: "root",
  })
});

router.post('/', async (req, res, next) => {
  const userId = req.body.userId;
  const device = req.body.device;
  redisClient.set(userId, device);
  res.status(204).send()
})

router.get('/:id', async (req, res, next) => {
  const value = await redisClient.get(req.params.id);
  res.status(200).json({
    value,
  })
})


module.exports = router;
