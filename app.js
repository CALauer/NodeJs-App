require('dotenv').config()

const mysql = require('mysql2/promise')
const morgan = require('morgan');
const express = require('express')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const router = express.Router()
const bodyParser=require('body-parser');
var PORT = process.env.PORT || 5000;
const app = express()







// My Defined Routes
const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');
const globalRouter = require('./routes/global.js');

var sessionStore = new MySQLStore(session);
app.set('trust proxy', 1);
app.set('view engine','ejs');
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var options = {
  connectionLimit : 1,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
}

let sessConnect = mysql.createPool(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}, sessConnect);

app.set('trust proxy', 1) 
// trust first proxy
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}))


  app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
    });


// Routes
app.use('/', registrationRouter);
app.use('/', dashboardRouter);
app.use('/', loginRouter);
app.use('/', logoutRouter);
app.use('/', globalRouter);











app.listen(PORT);
console.log(`Example app listening at http://localhost:${PORT}`)
