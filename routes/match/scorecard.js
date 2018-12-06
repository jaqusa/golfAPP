const router = require("express").Router();
const Scorecard = require("../../models/Scorecard");
const User = require("../../models/User");
const Course = require('../../models/Course')




function checkIfIsHere(req, res, next) {
  if (!req.app.locals.loggedUser) return res.redirect('/login')
  next()
}

router.get('/create',(req, res, next) => {
  res.render('match/create');
});

router.post('/create',(req, res, next) => {
  const course = req.body.course
  const j1 = req.body.jugador1
  const j2 = req.body.jugador2
  const j3 = req.body.jugador3
  
  Course.findOne({name: course})
  .then(course=>{
    User.findOne({username:j1})
    .then(user1=>{
      User.findOne({username:j2})
      .then(user2=>{
        User.findOne({username:j3})
        .then(user3=>{
          console.log(user1)
          console.log(user2)
          console.log(user3)
          console.log(course)
          destructuring(course,[user1,user2,user3])

        })
        .catch(e=>{console.log(e)})
      })
      .catch(e=>{console.log(e)})
    })
    .catch(e=>{console.log(e)})
  })
  .catch(e=>{console.log(e)})
});

function destructuring(course,users){

  const usuarios = []
  users.forEach(u=>{
    const user = {
      user:u._id,
      turn:[]
    }
    course.ventajas.forEach(v=>{
      course.par.forEach(p=>{

        const turn = {
          stroke:0,
          score:0,
          handicap:u.handicap,
         // holeAdvantage:Boolean,
          //stroke:Number,
         // score:Number,
          //totalStroke:Number,
          //resultMatch:Number 
        }
        user.turn.push(turn)  

        const hole = {
          advantage: v,
          par: p,
        }
        user.hole.push(hole)
       
      })
      
    })
    usuarios.push(user)
  })
  Scorecard.create({
    nameCourse: course.name,
    users:usuarios

  })


}

router.get('/scorecard',checkIfIsHere, (req, res, next) => {
  res.render('match/scorecard');
});


router.get('/live', checkIfIsHere,(req, res, next) => {
  //const form = document.querySelector("form")
  
  res.render('match/match');
});


module.exports = router