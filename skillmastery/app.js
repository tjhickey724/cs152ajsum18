const
 createError = require('http-errors'),
 express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 skillsController = require('./controllers/skillsController')
 const  studentsController = require('./controllers/studentsController')

// skillsRouter = require('./routes/skills'),
const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/skillmastery' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

var app = express();

// here is where we connect to the database!


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware to process the req object and make it more useful!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/skills',skillRouter)

// this handles all static routes ...
// so don't name your routes so they conflict with the public folders
app.use(express.static(path.join(__dirname, 'public')));


// here is where the routing happens, we're not using Routers
// as the app is still quite small...


app.get('/skills', skillsController.getAllSkills );
app.post('/saveSkill', skillsController.saveSkill );
app.post('/deleteSkill', skillsController.deleteSkill );
app.get('/students', studentsController.getAllStudents );

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
