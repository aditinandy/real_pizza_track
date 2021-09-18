require('dotenv').config();
const express = require('express');

const app = express();
const ejs = require('ejs');
const path = require('path');

// it also used form layout
// const expressLayout = require('express-ejs-layouts'); // file name most be like layout.ejs

const PORT = process.env.PORT || 8800;

const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');

// database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { userNewUrlParser: true, userCreateIndex: true, userUnifiedTopology: true, userFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("connection");
}).catch(err => {
	console.log("not connect");
})

// session store
let mongoStore = new MongoDbStore ({
	mongooseConnection: connection,
	collection: 'sessions' // here create a row named sessions
})

// passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())

// session config - 
app.use(session({
	secret: process.env.COOKIE_SECRET,
	resave: false,
	store: mongoStore.create({
		mongoUrl: url
	}),
	saveUninitialized: false,
	cookie: { maxAge: 1000 * 60 * 60 * 24 } // cookie life in milliseconds
	// cookie delete after 1hr from session database
}))

// express-flash
app.use(flash())

// Global middle-wire
app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
})

// assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.set('views', path.join(__dirname, './resources/views'));
app.set("views", './resources/views');
app.set('view engine', 'ejs');

require('./routes/web') (app) // here we call function, here app is the parameter of that export function

// if i add layout it also act
// app.get('/', (req, res) => {
// 	res.render('home');
// });

// app.get('/cart', (req, res) => {
// 	res.render('customers/cart');
// });

// app.get('/login', (req, res) => {
// 	res.render('auth/login');
// });

// app.get('/register', (req, res) => {
// 	res.render('auth/register');
// });

app.listen(PORT, () => {
	console.log(PORT);
});