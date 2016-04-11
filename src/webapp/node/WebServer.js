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
    console.log("Request from " + ip+ " for " + req.path);
    res.sendfile(path.resolve('../index.html'));
});

app.get("/api/matchHistory/:member", function (req, res) {
    console.log('request for : ' + req.param("member") + " matchhistory" );
    var memberreq = req.param("member");

    if(memberreq === 'Loda'){
        res.send("LodaHistory");
    }else if(memberreq === 's4'){
        res.send("s4History");
    }else if(memberreq === 'Bulldog'){
        res.send("AdmiralBulldogHistory");
    }else if(memberreq === 'Akke'){
        res.send("AkkeHistory");
    }else if(memberreq === 'EGM'){
        res.send("EGMHistory");
    }
});

/* serves all the static files */
app.use(express.static('../../webapp'));






app.listen(8080);

console.log("App listening on port 8080");
