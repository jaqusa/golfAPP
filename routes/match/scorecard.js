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
    course.ventajas.forEach(v=>{
      course.par.forEach(p=>{
        
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

  }).then(user=>{
    res.redirect(`/match/${user._id}`)
  }).catch(e=>console.log(e))
  


}

router.get('/scorecard', (req, res, next) => {
  res.render('match/scorecard');
});


router.get('/:id',(req, res, next) => {
  const id = req.params.id
  Scorecard.findById(id)
  .then(match=>{
    console.log(match.users[0])
    console.log(match.users[0].totalStroke)
    res.render('match/live',{match});
  })
  
});


module.exports = router