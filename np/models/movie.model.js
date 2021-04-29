const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: { type: String, unique: true },
    genre: { type: String },
    plot: { type: String },
  });

module.exports = model('Movie', movieSchema);