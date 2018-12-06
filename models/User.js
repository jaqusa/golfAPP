const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema (
  {
    //name:String,
    username: {
      type: String,
      required: true,
      unique:true
    },
    email:{
      type: String,
      required: true,
      unique:true
    },
    //facebookId: String,
    image: String,
    // imagePath:String,
    // imageName:String,
    // age: Number,
    // gender:{
    //   type: String,
    //   enum: [hombre, mujer]
    // },
    handicap: Number,
    games:[{
      type:Schema.Types.ObjectId,
      ref:"Scorecard"
    }]
  //   homeCourse: String,
  // },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

userSchema.plugin(passportLocalMongoose, { usernameField: "username" });
module.exports = mongoose.model('User', userSchema);

