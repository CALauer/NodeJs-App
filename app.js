require('dotenv').config()
const morgan = require('morgan');
const express = require('express')
const session = require('express-session')
const router = express.Router()
const bodyParser=require('body-parser');
const app = express()
var PORT = process.env.PORT || 5000;
// My Defined Routes
const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');
const globalRouter = require('./routes/global.js')
app.set('trust proxy', 1);
app.set('view engine','ejs');
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
    secure: true,
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    resave: false
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
