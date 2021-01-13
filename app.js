require('dotenv').config()
const morgan = require('morgan');
const express = require('express')
const session = require('express-session')
const router = express.Router()
const bodyParser=require('body-parser');
const app = express()
var PORT = process.env.PORT || 5000;
// My Defined Routes
const loginRouter = require('./routes/login-logout');
const registrationRouter = require('./routes/registration');
const dashboardRouter = require('./routes/dashboard');
const globalRouter = require('./routes/global.js');
const { response } = require('express');

app.set('view engine','ejs');
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({ 
    secret: '123456cat',
    resave: false,
    keys: ['key1', 'key2'],
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use('/', function(req, res, next) {
  if(req.session.loggedinUser == true){
    res.app.locals.menuBtn = "Logout"
    next()
  }else{
    res.app.locals.menuBtn = "Login"
    next()
  }
} )

// Routes
app.use('/', registrationRouter);
app.use('/', dashboardRouter);
app.use('/', loginRouter);
app.use('/', globalRouter);

// 

// function test(status) {
//   if(status == true) {
//     return "logout"
//   }
//   return "login"
// }
// app.locals.menuBtn = test()














app.listen(PORT);
console.log(`Example app listening at http://localhost:${PORT}`)
