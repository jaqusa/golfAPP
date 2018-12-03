const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");


router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}),
(req, res, next) => {
  res.redirect('/scorecard')
})

router.get('/login', (req, res, next) => {
  res.render('auth/login')
});



router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup',(req,res,next)=>{
  User.register(req.body,req.body.password)
  .then(user=>{
    res.json(user)
  })
  .catch(e=>console.log(e))
})


module.exports = router