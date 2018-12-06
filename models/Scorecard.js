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
      turn:[{
        handicap:Number,
        holeAdvantage:Boolean,
        stroke:Number,
        score:Number,
        totalStroke:Number,
        resultMatch:Number 
      }],
      hole:[{
        advantage: Array,
        par:Array,
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




