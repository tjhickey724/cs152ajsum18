const
 createError = require('http-errors'),
 express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 indexRouter = require('./routes/index'),
 usersRouter = require('./routes/users'),
 skillsController = require('./controllers/skillsController')
// skillsRouter = require('./routes/skills'),
 mongoose = require( 'mongoose' );

var app = express();

// here is where we connect to the database!
mongoose.connect( 'mongodb://localhost/skillmastery' );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware to process the req object and make it more useful!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// this handles all static routes ...
// so don't name your routes so they conflict with the public folders
app.use(express.static(path.join(__dirname, 'public')));


//
app.use('/', indexRouter);
app.use('/users', usersRouter);

//app.use('/skills',skillsRouter);
app.get( '/skills', skillsController.getAllSkills );
app.post( '/saveSkill', skillsController.saveSkill );

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
