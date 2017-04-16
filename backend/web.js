var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Specify Controllers here
// var food = require('./routes/food');
var auth = require('./routes/auth');
var book = require('./routes/book');

var app = express();
var http = require('http').Server(app);

// In order to track req's body
//request.body.~~
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
// app.get('/recipes', food.getRecipes);
app.post('/signup', auth.signup);
app.post('/login', auth.login);
app.get('/mypins', book.getMyPins);
app.get('/getpins', book.getPins);
app.post('/postpin', book.postPin);
// app.get('/calories', food.getCalorie);
app.get('/user', auth.getUserInfo);
app.get('/username', book.getUsername);
app.get('/clearcookie', function(req,res){
     res.cookie('auth_token', "");
     res.redirect('/login.html');

    //  res.send('Cookie deleted');
});


// Specify static file path here
app.use('/', express.static(__dirname + '/routes/static'))
// always required to run the server
var server = http.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
