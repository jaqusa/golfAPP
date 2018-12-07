const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");


function checkIfIsHere(req, res, next) {
  if (!req.app.locals.loggedUser) return res.redirect('/login')
  next()
}

router.get('/login', (req, res, next) => {
  res.render('auth/login')
});


router.post('/login',(req, res, next)=>{
  passport.authenticate('local',(info, user, err)=>{
    if(err) return res.render('auth/login',{message:err.message})
    if(!user) return res.render('auth/login',{message:err.message})    
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })(req, res, next)
})

// router.post('/login',passport.authenticate('local'),(req, res, next)=>{
//   res.redirect('/profile')
// })


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});


router.post('/signup', (req, res, next) => {
  const { username,email, password, repassword, handicap } = req.body;
  if (username === '' || email === '' || password === '' || repassword === '' || handicap === '' ) {
    return res.render('auth/signup', {
      message: 'Por favor rellena todos los campos'
    })
  }  
  if (!email.includes('@')) {
    return res.render('auth/signup', {
      message: 'Por favor ingresa un email valido'
    })
  }
  if (password !== repassword) {
    return res.render('auth/signup', {
      message: 'Las contraseñas no coinciden'
    })
  }

  User.findOne({ username })
  .then(response => {
    if (response === null) {  
      User.findOne({ email })
      .then(response =>{
        if (response === null) {  
          User.register(req.body,req.body.password)
          .then(user => {
            res.redirect('/profile')
          })
          .catch(err => {
            console.log(err);
          })
        }else{
          res.render('auth/signup', {
            message: 'Este email ya existe'
          })
        }
      })
      .catch(err=> {console.log(err)})
      
    } else {
      res.render('auth/signup', {
        message: 'Este nombre de usuario ya existe'
      })
    }
    
  })
  .catch(err => {
    console.log(err);
  })
});





router.get('/profile', checkIfIsHere, (req, res, next) => {
  const user = req.app.locals.loggedUser
  res.render('auth/profile',user);
});



// router.get('/logout', (req, res ,next) => {
//   req.session.destroy()
//   //req.logOut(); 
//   //res.redirect('/login')
  
// })
router.get('/logout', (req, res) => {
  req.app.locals.loggedUser = ""
  req.session.destroy(err => {
    if (err) res.send(err);
    else return res.redirect('/login');
  })
})







module.exports = router