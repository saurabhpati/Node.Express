var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    handlebars = require('express-handlebars'),
    app = express(),
    port = 8888,
    json = {
        navbar:[
            {
                name: 'Books',
                routes: '/books'
            },
            {
                name: 'Authors',
                routes: '/authors'
            }
        ]
    };

app.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Server Running... Listening on port ' + port);
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/Config/passport')(app);
app.set('views', './src/Views');
app.set('view engine', '.hbs');
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

var booksRouter = require('./src/Routers/booksRouter')(json.navbar),
    adminRouter = require('./src/Routers/adminRouter')(json.navbar),
    authRouter = require('./src/Routers/authRouter')();

app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (request, response) {
    response.render('index', json);
});