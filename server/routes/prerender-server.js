module.exports = function(app) {
  var express = require('express');
  var prerenderServerRouter = express.Router();
  prerenderServerRouter.get('/', function(req, res) {
    res.send({prerender-server:[]});
  });
  app.use('/api/prerenderServer', prerenderServerRouter);
};
