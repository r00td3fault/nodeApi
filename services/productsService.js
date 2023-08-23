const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    return this.products.find( prd => prd.id === id);
  }

  async update(id, changes) {
    const index = this.products.findIndex( item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not fonud');
    }
    this.products[index] = Object.assign(this.products[index],changes);
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex( item => item.id === id);
    if(index === -1){
      return null;
    }
    this.products.splice(index, 1);
    return id;

  }

}


module.exports = ProductsService;
