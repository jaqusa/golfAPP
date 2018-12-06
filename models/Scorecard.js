const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scorecardSchema = new Schema(
  {
    nameCourse: String,
    holes:[{
        type: Schema.Types.ObjectId,
    }] ,
    users: [
      {
        type: Schema.Types.ObjectId,
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

 module.exports = mongoose.model("Scorecard", scorecardSchema);











tiros:[] //length = nr users
par:[] // req API
hoyos:[] // lo da el user que crea el match
ventajas:[] // depende del nr de hoyos