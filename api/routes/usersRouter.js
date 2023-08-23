const express = require('express');
const UsersService = require('./../services/usersService');

const router = express.Router();

const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const users = await service.findOne(id);
  res.status(200).json(users);

});

router.post('/', async (req, res) => {
  const body = req.body;
  const createdUser = await service.create(body);
  res.status(201).json({
    createdUser
  })

});

module.exports = router;
