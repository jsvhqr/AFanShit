var express = require('express');
var app = express();
var path = require('path');
var steamkey = "1ED27D8168C151D5FF743AB7FAC2151E";
var steamBaseUri = "https://api.steampowered.com/IDOTA2Match_570/";





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

app.get("/matchHistory/:member", function (req, res) {
    console.log('request for : ' + req.getParameter("member") + " matchhistory" );
    var memberreq = req.getParameter("member");

    if(memberreq === 'Loda'){
        
    }else if(memberreq === 's4'){

    }else if(memberreq === 'AdmiralBulldog'){

    }else if(memberreq === 'Akke'){

    }else if(memberreq === 'EGM'){

    }
});




app.listen(8080);

console.log("App listening on port 8080");
