
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const hoyoSchema = new Schema(
  {
    number: Number,
    par: Number,
    advantage: String,
    users: [
      {
        username:String,
        holeAdvantage:Boolean,
        handicap:Number,
        strokes:Number,
        score:Number 
      }
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

 module.exports = mongoose.model("Hoyo", hoyoSchema);








