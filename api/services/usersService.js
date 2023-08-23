const { faker } = require('@faker-js/faker');


class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        image: faker.image.url(),
      });
    }
  }

  async create ( user){
    user.id = faker.string.uuid();
    this.users.push(user);
    return user;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    return this.users.find( prd => prd.id === id);
  }

  async update() {

  }

  async delete(){

  }

}


module.exports = UsersService;
