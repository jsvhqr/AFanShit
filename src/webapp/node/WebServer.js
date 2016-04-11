var express = require('express');
var app = express();
var path = require('path');
var steamkey = "31752057B2C8038B2F4DD19174E2B6A7";
var steamBaseUri = "https://api.steampowered.com/";
var lodaKey = "101495620";
var s4Key = "41231571";
var bulldogKey = "76482434";
var egmKey = "3916428";
var akkeKey = "41288955";
var request = require('request');



app.get("/", function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log("Request from " + ip+ " for " + req.path);
    res.sendfile(path.resolve('../index.html'));
});

/* serves all the static files */
app.use(express.static('../../webapp'));

app.get("/api/matchHistory/:member", function (req, res) {
    console.log('request for : ' + req.param("member") + " matchhistory" );
    var memberreq = req.param("member");

    if(memberreq === 'Loda'){
        request(steamBaseUri+"IDOTA2Match_570/GetMatchHistory/V001/?key="+steamkey+"&account_id="+lodaKey, function (error,response,body) {
            if(!error && response.statusCode === 200){
                res.send(JSON.parse(body));
            }
        });
    }else if(memberreq === 's4'){
        request(steamBaseUri+"IDOTA2Match_570/GetMatchHistory/V001/?key="+steamkey+"&account_id="+s4Key, function (error,response,body) {
            if(!error && response.statusCode === 200){
                res.send(JSON.parse(body));
            }
        });
    }else if(memberreq === 'Bulldog'){
        request(steamBaseUri+"IDOTA2Match_570/GetMatchHistory/V001/?key="+steamkey+"&account_id="+bulldogKey, function (error,response,body) {
            if(!error && response.statusCode === 200){
                res.send(JSON.parse(body));
            }
        });
    }else if(memberreq === 'Akke'){
        request(steamBaseUri+"IDOTA2Match_570/GetMatchHistory/V001/?key="+steamkey+"&account_id="+akkeKey, function (error,response,body) {
            if(!error && response.statusCode === 200){
                res.send(JSON.parse(body));
            }
        });
    }else if(memberreq === 'EGM'){
        request(steamBaseUri+"IDOTA2Match_570/GetMatchHistory/V001/?key="+steamkey+"&account_id="+egmKey, function (error,response,body) {
            if(!error && response.statusCode === 200){
                res.send(JSON.parse(body));
            }
        });
    }
});

app.listen(8080);

console.log("App listening on port 8080");
