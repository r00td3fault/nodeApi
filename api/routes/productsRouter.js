const express = require('express');

const ProductsService = require('./../services/productsService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createProductSchema,  updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();

const service = new ProductsService();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      this.setTrote();
      const product = await service.findOne(id);
      product ?  res.json(product) : res.status(404).json({});
    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedId = await service.delete(id);
  res.json(deletedId);
});

module.exports = router;
