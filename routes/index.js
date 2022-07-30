var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
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
