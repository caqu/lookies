module.exports = function(app) {
  var express = require('express');
  var prerenderServerRouter = express.Router();
  prerenderServerRouter.get('/', function(req, res) {
    res.send({prerenderServer:[]});
  });
  app.use('/api/prerenderServer', prerenderServerRouter);
};
