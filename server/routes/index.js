var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET About page. */
router.get('/aboutus', function(req, res, next) {
  res.render('Pages/aboutus', { title: 'About us' });
});
/* GET FAQs page. */
router.get('/faqs', function(req, res, next) {
  res.render('Pages/FAQs', { title: 'FAQs' });
});

module.exports = router;
