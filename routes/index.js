const express = require('express');
const router  = express.Router();
const aws4 = require('aws4')
const http = require('http')
const axios = require('axios')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});






router.get('/probando', (req, res, next)=>{
  var opts = {host: 'api.golfbert.com', path: '/v1/courses'}
  aws4.sign(opts,{   
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }) 
  //console.log(opts)
  axios.get('https://api.golfbert.com/v1/courses/',opts)
    .then(r=>{
      console.log(r.data)
    }).catch(e=>{
      console.log(e)
    })
  
  // http.request(opts, function(resp) { 
    
  //   //response.pipe(process.stdout) 
  //   //console.log(opts)
  // }).end()
  })

  router.get



module.exports = router;
