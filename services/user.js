const MongoLib = require("../database");
const bcrypt = require("bcrypt");

class UsersService {
  async getUsers() {
  }
  async getUser({ email }) {
  }
  async getUser({ username }) {
  }
  async get({ userId }) {
  }

  async createUser({ user }) {
    let createUserId = null;
    const { document, name, surname, username, email, rol, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (rol == "Administrador") {
      createUserId = await this.mongoDB.create(this.collection, {
        document,
        name,
        surname,
        username,
        email,
        rol,
        password: hashedPassword,
      });
    } else {
      createUserId = await this.mongoDB.create(this.collection, {
        document,
        name,
        surname,
        username,
        email,
        rol: "Local",
        password: hashedPassword,
      });
    }
    return createUserId;
  }

  async updateUser({ userId, user }) {
  }

  async deletedUser({ userId }) {
  }
}

module.exports = UsersService;
