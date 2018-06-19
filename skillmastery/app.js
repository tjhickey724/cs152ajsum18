const
 createError = require('http-errors'),
 express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 skillsController = require('./controllers/skillsController'),
 mongoose = require( 'mongoose' ),
 session = require("express-session"),
 bodyParser = require("body-parser"),
 User = require( './models/user' ),
 flash = require('connect-flash')


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

 // here we set up authentication with passport
 const passport = require('passport')
 const configPassport = require('./config/passport')
 configPassport(passport)


var app = express();

// here is where we connect to the database!
mongoose.connect( 'mongodb://localhost/skillmastery' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware to process the req object and make it more useful!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'zzbbyanana' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));


// this handles all static routes ...
// so don't name your routes so they conflict with the public folders
app.use(express.static(path.join(__dirname, 'public')));





// here are the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

// route for logging out
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/loginerror'
            }));

    app.get('/login/authorized',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/loginerror'
            }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      return next();
    }

    console.log("user has not been authenticated...")
    // if they aren't redirect them to the home page
    res.redirect('/login');
}


// here are our regular app routes ...
// we require them to be logged in to access the skills page
app.get('/skills', isLoggedIn, skillsController.getAllSkills );
app.post('/saveSkill', isLoggedIn, skillsController.saveSkill );
app.post('/deleteSkill', isLoggedIn, skillsController.deleteSkill );

app.use('/', function(req, res, next) {
  console.log("in / controller")
  res.render('index', { title: 'Skills Mastery App' });
});


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
