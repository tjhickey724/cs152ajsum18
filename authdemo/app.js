const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require( 'mongoose' )
const session = require("express-session")
const passport = require('passport')
const configPassport = require('./config/passport')


const swController = require('./controllers/swController')
const indexController = require('./controllers/indexController')
const helloDFController = require('./controllers/helloDFController')
const helloDFControllerv2 = require('./controllers/helloDFControllerv2')



// add the mongoose package and initialized
// this is need to keep track of the users ...
mongoose.connect( 'mongodb://localhost/authdemo' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

/* ********************************************* */
//NEW CODE FOR AUTHENTICATION ..

configPassport(passport)
/* ********************************************* */


var app = express()




// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');


// Authentication must have these three middleware in this order!
app.use(session({ secret: 'zzbbyanana' }));
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// NEXT ADD THE AUTHENTICATION ROUTES
// Visit this route to start the google authentication
// passport will send you to google to get authenticated
// and then will send the browser back to /logic/authorized page

app.use((req,res,next) => {
  //console.log("middleware to set loggedIn is being run")
  //console.log(req.user)
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    console.log("user has been Authenticated")
    res.locals.user = req.user
    res.locals.loggedIn = true
    if (req.user){
      if (req.user.googleemail=='tjhickey@brandeis.edu'){
        console.log("Owner has logged in")
        res.locals.status = 'teacher'
      } else {
        console.log('student has logged in')
        res.locals.status = 'student'
      }
    }
  }
  next()
})

console.log(`helloDFControllerv2.respondToDF=${helloDFControllerv2.respondToDF}`)

app.post('/hook3',(req,res,next)=> {
  console.log('in app.post for /hook')
  console.dir(req)
  console.log(`req.body.result.parameters=${req.body.result.parameters}`)
  next()
})
app.post('/hook2',helloDFControllerv2.respondToDF)

app.post('/hook',helloDFController.respondToDF)

app.get('/auth/google',
    passport.authenticate('google',
                         { scope : ['profile', 'email'] }));

app.get('/login/authorized',
        (req,res,next) => {
          console.log('we are in login/authorized')
          next()
        },
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        }));

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()){
      res.locals.loggedIn = true
      console.log("user has been Authenticated")
      return next();
    } else {
      console.log("user has not been authenticated...")
      res.redirect('/login');
    }
}

// route for logging out
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// *************************************





app.get('/', indexController.renderMain)

app.use('/chat',
      function(req,res){
          console.log("in side chat controller")
          console.dir(res.locals)
          res.render('chat',{})
})

app.get('/starwars',
            swController.attachFilms,
            swController.renderMain)




app.get('/starwars/films/:filmNum',
            swController.attachFilms,
            swController.renderFilm)

app.get('/starwars/films/:filmNum/json',
            swController.attachFilms,
            swController.getFilm)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
