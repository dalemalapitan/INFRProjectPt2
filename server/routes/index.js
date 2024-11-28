var express = require('express');
var router = express.Router();
const passport = require('passport');
const DB = require('../config/db');
let userModel = require('../model/User');
let User = userModel.User;

/* GET index page. */
router.get('', function(req, res, next) {
  res.render('Pages/home', { 
    title: 'Home',
    displayName: req.user ? req.user.displayName:''
   });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('Pages/home', { 
    title: 'Home',
    displayName: req.user ? req.user.displayName:''
   });
});
/* GET About page. */
router.get('/aboutus', function(req, res, next) {
  res.render('Pages/aboutus', { 
    title: 'About us',
    displayName: req.user ? req.user.displayName:''
   });
});
/* GET FAQs page. */
router.get('/faqs', function(req, res, next) {
  res.render('Pages/FAQs', { 
    title: 'FAQs',
    displayName: req.user ? req.user.displayName:'' });
});

router.get('/login', function(req,res,next){
  if(!req.user)
  {
    res.render('Auth/login',
      {
        title: 'Login',
        message: req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName:''
      }
    )
  }
  else{
    return res.redirect('/')
  }
})

router.post('/login', function(req,res,next) {
  passport.authenticate('local', (err, user, info)=> {
    if(err)
    {
      return next(err)
    }
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }
    req.login(user, (err)=>{
      if(err)
      {
        return next(err)
      }
      return res.redirect('/todoList')
    })
  }) (req, res, next)
})

router.get('/register', function(req, res, next){
  if(!req.user)
  {
    res.render('Auth/register', {
      title: 'Register',
      message: req.flash('registerMessage'), 
      displayName: req.user? req.user.displayName:''
    })
  }
  else {
    return res.redirect('/')
  }
})

router.post('/register', function(req, res, next){
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password, (err) =>
  {
    if(err) {
      console.log("Error: Inserting the new User");
      if(err.name=="UserExistError")
        {
          req.flash('registerMessage', 
            'Registaration Error: User already exists')
        }
      return res.render('Auth/register', {
        title: 'Register',
        message: req.flash('registerMessage'),
        displayName: req.user? req.user.displayName:''
      })
    }
    else{
      return passport.authenticate('local')(req, res, ()=> {
        res.redirect('/todoList')
      })
    }
  })
})

router.get('/logout', function(req,res,next) {
  req.logOut(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/')
})


module.exports = router;
