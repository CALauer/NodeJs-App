require('dotenv').config()

const morgan = require('morgan');
const express = require('express')
const app = express()
const mysql = require('mysql2/promise')

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const router = express.Router()
const bodyParser=require('body-parser');
var PORT = process.env.PORT || 5000;



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
  database : process.env.DB_NAME,
  clearExpired: true,
  createDatabaseTable: true,
  charset: 'utf8mb4_bin',
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
}

let sessConnect = mysql.createPool(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}, sessConnect);

app.set('trust proxy', 1) 
// trust first proxy
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

process.on('uncaughtException', function (err) {
  console.log(err);
}); 
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
