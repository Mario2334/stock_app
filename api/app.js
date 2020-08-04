require('dotenv').config()

require('./mongo_client')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var server_settings = require('./bin/www')
var indexRouter = require("./routes/index")
var http = require('http');
var debug = require('debug')('api:server');
var socket_setting =  require("./routes/socket")
var exphbs  = require('express-handlebars');

function onListening() {
    console.log("Application Running");
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);

}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",indexRouter)
app.use("/",socket_setting.router)
app.set('port', server_settings.norm_port);

// Handle bar config
app.set('views', path.join(__dirname, 'views/'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
// app.set('view engine', 'handlebars');

var server = http.createServer(app);


db_client.connect().then(()=> {
    socket_setting.io.attach(server)

    server.on('error', server_settings.onError);
    server.on('listening', onListening);
    server.listen(server_settings.norm_port)
})

