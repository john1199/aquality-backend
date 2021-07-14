const mongoose = require("mongoose");

const fuenteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  valoracion: {
    type: Object,
    required: true,
  },
  localizacion: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  idDispositivo: {
    type: Number,
    default: 0,
    required: false,
  },
});

module.exports = mongoose.model("waterresource", fuenteSchema);
