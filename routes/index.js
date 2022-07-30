const express = require('express');
const router = express.Router();
const getAll = require('../models/progress');


router.get('/', async (req, res, next) => {
  await getAll();
  res.status(200).json({
    message: "root",
  })
});

router.post('/', (req, res, next) => {
  res.status(204).send()
})

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: "get",
  })
})


module.exports = router;
