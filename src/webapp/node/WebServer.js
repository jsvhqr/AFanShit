var express = require('express');
var app = express();
var path = require('path');


app.get("/", function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log("Request from " + ip);
    res.sendfile(path.resolve('../index.html'));
});

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(path.resolve('..') + req.params[0]);
});

app.listen(8080);

console.log("App listening on port 8080");
