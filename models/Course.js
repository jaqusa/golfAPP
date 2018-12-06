
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampoSchema = new Schema (
  {
    name: String,
    ventajas:[Number],
    par:[Number],
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: true
      }
    }
  )
  const Campo = mongoose.model('Campo', CampoSchema);

  module.exports = Campo;