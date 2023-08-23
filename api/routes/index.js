const express = require('express');
const productsRouter = require("./productsRouter");
const usersRouter = require("./usersRouter");
const categoriesRouter = require("./categoriesRouter");

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);

  // const router2 = express.Router();
  // app.use('/api/v2', router2);
  // router2.use('/products', productsRouter);
}

module.exports = routerApi;
