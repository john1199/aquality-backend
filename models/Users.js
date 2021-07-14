const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  document: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})