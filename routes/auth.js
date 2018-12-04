const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");


router.get('/login', (req, res, next) => {
  res.render('auth/login')
});


router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), 
(req, res, next) => {
 res.redirect('/profile')
})


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


router.get('/profile', (req, res, next) => {
  res.render('auth/profile');
});

router.get('/creatematch', (req, res, next) => {
  res.render('match/creatematch');
});




module.exports = router