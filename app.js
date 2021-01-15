require('dotenv').config()
const morgan = require('morgan');
const express = require('express')
const session = require('express-session')
const router = express.Router()
const bodyParser=require('body-parser');
const db = require('./database')
const app = express()
var PORT = process.env.PORT || 5000;
// My Defined Routes
const loginRouter = require('./routes/login-logout');
const registrationRouter = require('./routes/registration');
const dashboardRouter = require('./routes/dashboard');
const globalRouter = require('./routes/global');
const stocksRouter = require('./routes/stocks');
const { response } = require('express');
// NEW 
var MySQLStore = require('express-mysql-session')(session);

var options = {
	host: process.env.DB_HOST,
	port: 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
};
var sessionStore = new MySQLStore(options);

app.set('view engine','ejs');
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({ 
    secret: '123456cat',
    resave: false,
    keys: ['key1', 'key2'],
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 },
    store: sessionStore
  }))




  app.use(function (req, res, next) {
    res.locals.currentUser = req.session.loggedinUser;
    res.locals.userTitle = req.session.title;
    res.locals.userId = req.session.userId;
    next();
});
app.use('/', function(req, res, next) {
  if(req.session.loggedinUser == true){
    app.locals.menuBtn = "Logout"
    app.locals.test = ""
    next()
  }else{
   app.locals.menuBtn = "Login"
   app.locals.test = "Create Free Account"
    next()
  }
} )

// Routes
app.use('/', registrationRouter);
app.use('/', dashboardRouter);
app.use('/', loginRouter);
app.use('/', globalRouter);
app.use('/', stocksRouter);
// app.use('/', userposts);

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
