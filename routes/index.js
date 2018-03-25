var express = require('express');
var router = express.Router();
const Render = require('../controller/render');

//主页
router.get('/', function (req, res, next) {
  res.redirect('./sorry/');
});

//选择模板页面
router.get('/:name', function (req, res, next) {
  res.render('./' + req.params.name + '/index');
});

//生成模板
router.post('/:name/make', Render.action);

module.exports = router;