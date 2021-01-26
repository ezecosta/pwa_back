var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var productsRouter = require("./routes/products");
var categoriesRouter = require ("./routes/categories");
var salesRouter = require ("./routes/sales");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var app = express();

app.set("secretKey", process.env.SECRET_KEY);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** HEADER INICIO */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
  res.send(200);
});
/** HEADER FIN */

app.use('/users', usersRouter);
//app.use("/products", validateUser, productsRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/sales", validateUser, salesRouter);


//Middleware que valida un user
function validateUser(req, res, next){
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, decoded){ // jwt.verify verifica si un token es válido o no
    if (err){
      res.json({message: err.message});
    }else{
      req.body.tokenData = decoded; //Decoded tiene los datos asociados al momento de crearse el token, en este caso, UserID. Se guarda en el body con el nombre tokenData
      next();
    }
  }); 
}

app.validateUser = validateUser;

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
  res.json({code: err.code, msg: err.message});
});

module.exports = app;
