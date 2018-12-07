const mongoose = require("mongoose");
const Campo = require('../models/Campo')

const dbName = 'golf'
mongoose.connect("mongodb://admin:admin12345@ds225028.mlab.com:25028/golf")


const Campos = [
  {
    'name' : "Club de golf Chapultepec",
    'ventajas': [17,7,11,3,5,1,9,15,13,8,10,14,6,2,16,4,18,12],
    'par': [4,4,3,4,4,5,3,5,4,4,5,4,3,4,5,4,3,4],
  },
  {
    'name' : "Club de golf Avandaro",
    'ventajas': [6,15,4,10,14,5,11,9,7,13,18,2,1,16,8,17,3,12],
    'par': [4,3,5,3,5,4,4,3,4,4,4,4,5,3,5,3,5,4],
  }]


  Campo.create(Campos)
  .then(campo =>{
    console.log('campos created')
    mongoose.connection.close()
  })
  .catch(err=>{
    console.log('something went wrong')
  })