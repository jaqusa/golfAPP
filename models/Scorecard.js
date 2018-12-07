const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scorecardSchema = new Schema(
  {
    nameCourse: String,
    users:[{
      user:{
        type:Schema.Types.ObjectId,
        ref:"User"
      },
      username:String,
      turn:[{
        handicap:Number,
        holeAdvantage:Boolean,
        stroke:Number,
        score:Number,
        totalStroke:Number,
        resultMatch:Number 
      }],
      hole:[{
        advantage: Number,
        par:Number,
      }]
    }]
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

 module.exports = mongoose.model("Scorecard", scorecardSchema);




