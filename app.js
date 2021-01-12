require('dotenv').config()
const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_name = process.env.DB_NAME 
const morgan = require('morgan');
const express = require('express')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const router = express.Router()
const bodyParser=require('body-parser');
const app = express()
var PORT = process.env.PORT || 5000;
// My Defined Routes
const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');
const globalRouter = require('./routes/global.js');
var sessionStore = new MySQLStore(session);
let mysql = require('mysql2/promise')
app.set('trust proxy', 1);
app.set('view engine','ejs');
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var options = {
  connectionLimit : 10,
  host     : db_host,
  user     : db_user,
  password : db_password,
  database : db_name
}

var connection = mysql.createPool(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}, connection);

app.use(session({
    store: sessionStore,
    secret: '1234567'
  }))


// Routes
app.use('/', registrationRouter);
app.use('/', dashboardRouter);
app.use('/', loginRouter);
app.use('/', logoutRouter);
app.use('/', globalRouter);











app.listen(PORT);
console.log(`Example app listening at http://localhost:${PORT}`)
