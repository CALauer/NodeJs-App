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
const feeds = require('./routes/feed');
const { response } = require('express');
// NEW 
var MySQLStore = require('express-mysql-session')(session);

var options = {
	host: process.env.DB_HOST,
	port: 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  userCount: 0,
  connectionLimit: 1,
  clearExpired: true,
  checkExpirationInterval: 1000,
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
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60}, 
    // userInfo: {loggedIn: false},
    store: sessionStore
  }))
    


  app.use(function (req, res, next) {
 console.log(req.session)

    if(req.session.userInfo == undefined) {
      console.log(req.session.userInfo)
      app.locals.currentUser = false
      app.locals.userTitle = ""
      app.locals.menuBtn = "Login"
      app.locals.test = "Create Free Account"


    } else {
    app.locals.currentUser = req.session.userInfo.loggedIn
    app.locals.userTitle = req.session.userInfo.userPerm
    app.locals.userId = req.session.userInfo.userId
    app.locals.email = req.session.userInfo.email
    app.locals.menuBtn = "Logout"
  }

      // req.session.userInfo = userInfo;
      // res.locals.currentUser = true;
    // req.session.userInfo.loggedIn;
  //   res.locals.userId = req.session.userInfo.userId;
  //   res.locals.userCount = req.sessionStore.options.userCount;
  //   console.log(req.sessionStore.options.userCount)
  console.log(req.session)
  next()

    })

  // }



// Routes
app.use('/', registrationRouter);
app.use('/', dashboardRouter);
app.use('/', loginRouter);
app.use('/', globalRouter);
app.use('/', stocksRouter);
app.use('/', feeds);
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
