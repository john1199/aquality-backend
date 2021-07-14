const MongoLib = require("../database");
const bcrypt = require("bcrypt");

class UsersService {
  constructor() {
    this.collection = "Users";
    this.mongoDB = new MongoLib();
  }
  async getUsers() {
    const user = await this.mongoDB.getAll(this.collection);
    return user || [];
  }
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }
  async getUser({ username }) {
    const [user] = await this.mongoDB.getAll(this.collection, { username });
    return user;
  }
  async get({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user || null;
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
    const updateUserId = await this.mongoDB.update(this.collection, userId, user);
    return updateUserId;
  }

  async deletedUser({ userId }) {
    const deleteUserId = await this.mongoDB.delete(this.collection, userId);
    return deleteUserId;
  }
}

module.exports = UsersService;
