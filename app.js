require('dotenv').config()

const morgan = require('morgan');
const express = require('express')
const session = require('express-session');
const router = express.Router()
const bodyParser=require('body-parser');
let PORT = process.env.PORT || 5000;

const app = express()


// My Defined Routes
const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');
const globalRouter = require('./routes/global.js');

app.set('trust proxy', 1);
app.set('view engine','ejs');
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




// Routes
app.use('/', registrationRouter);
app.use('/', dashboardRouter);
app.use('/', loginRouter);
app.use('/', logoutRouter);
app.use('/', globalRouter);











app.listen(PORT);
console.log(`Example app listening at http://localhost:${PORT}`)
