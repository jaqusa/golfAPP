const router = require("express").Router();
const Scorecard = require("../../models/Scorecard");
const User = require("../../models/User");
const Course = require('../../models/Course')


function checkIfIsHere(req, res, next) {
  if (!req.app.locals.loggedUser) return res.redirect('/login')
  next()
}

router.get('/create',checkIfIsHere,(req, res, next) => {
  res.render('match/create');
});

router.post('/create',(req, res, next) => {
 
  Course.findOne({name: req.body.course})
  .then(course=>{
    User.findOne({username:req.body.jugador1})
    .then(user1=>{
      User.findOne({username:req.body.jugador2})
      .then(user2=>{
        User.findOne({username:req.body.jugador3})
        .then(user3=>{
          const usersArr = [user1,user2,user3]
          destructuring(res,course,usersArr)
          
        })
        .catch(e=>{console.log(e)})
      })
      .catch(e=>{console.log(e)})
    })
    .catch(e=>{console.log(e)})
  })
  .catch(e=>{console.log(e)})
});

function destructuring(res,course,users){

  const usuarios = []
  users.forEach(u=>{
    const user = {
      user:u._id,
      username:u.username,
      turn:[],
      hole:[]
    }
    
    for(var i=0; i<18;i++ ){
    
        
        const turn = {
          stroke:0,
          score:0,
          handicap:u.handicap,
          holeAdvantage:true,
          stroke:0,
          score:0,
          totalStroke:0,
          resultMatch:0
        }
        user.turn.push(turn)  

       
        const hole = {
          advantage: course.ventajas[i],
          par: course.par[i],
        }
        user.hole.push(hole)
      
      
      
    }
    usuarios.push(user)
  })
  Scorecard.create({
    nameCourse: course.name,
    users:usuarios

  }).then(user=>{
    res.redirect(`/match/${user._id}`)
  }).catch(e=>console.log(e))
  


}

router.get('/scorecard',checkIfIsHere, (req, res, next) => {
  res.render('match/scorecard');
});


router.get('/:id',checkIfIsHere,(req, res, next) => {
  const id = req.params.id
  Scorecard.findById(id)
  .then(match=>{
    let turns = match.users.map(u => { return u.turn })
    let holes = match.users.map(u => { return u.hole })
    let totalStrokes1 = turns[0].map(r => {
      return r.totalStroke
    })
    let totalStrokes2 = turns[1].map(r => {
      return r.totalStroke
    })
    let totalStrokes3 = turns[2].map(r => {
      return r.totalStroke
    })
    totalStrokes1number = totalStrokes1.reduce((a,b) => a + b)
    totalStrokes2number = totalStrokes2.reduce((a,b) => a + b)
    totalStrokes3number = totalStrokes3.reduce((a,b) => a + b)
    match.users[0].tS = totalStrokes1number
    match.users[1].tS = totalStrokes2number
    match.users[2].tS = totalStrokes3number

    let objnew = { match, turns, holes, id  }
    console.log(objnew.holes[0][0])
    res.render('match/live', { objnew });
  })

  
});





module.exports = router