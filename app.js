var express = require('express');
var app = express();
var sql = require('mssql');
const appInsights = require("applicationinsights");
appInsights.setup("0f6ef017-c758-4464-bf6f-9f510305be94")
.setAutoDependencyCorrelation(true)
.setAutoCollectRequests(true)
.setAutoCollectPerformance(true)
.setAutoCollectExceptions(true)
.setAutoCollectDependencies(true)
.setAutoCollectConsole(true)
.setUseDiskRetryCaching(true)
.start();


var config = {
    user: 'books',
    password: 'P@ssw0rd',
    server: 'reinaldosql.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'library',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(config, function (err) {
    console.log(err);
});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Author',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/booksRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

// appInsights.defaultClient.trackNodeHttpRequest({request: req, response: res});

app.all(function (req, res, next) {
    appInsights.defaultClient.trackNodeHttpRequest({request: req, response: res});
    next();
})
.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});