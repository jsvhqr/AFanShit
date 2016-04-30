var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var steamkey = "B90BAAED0012DCB6245ADBC26B2ACF86";
var steamBaseUri = "https://api.steampowered.com/";
var lodaKey = "101495620";
var s4Key = "41231571";
var bulldogKey = "76482434";
var egmKey = "3916428";
var akkeKey = "41288955";
var request = require('request');
var heroes = new Array();
var itemsURIs = new Array();
var funcs = require('../functions/startServerFunctions');
var lodaHistory = new Array();
var akkeHistory = new Array();
var egmHistory = new Array();
var bulldogHistory = new Array();
var s4History = new Array();


funcs.getHeros(steamkey,steamBaseUri, function(err, data){
    if(err){
        console.log(err);
    }else{
        heroes = data;
        funcs.getItems(steamkey,steamBaseUri,function(err,data){
            funcs.getItemURIs(data,steamkey,steamBaseUri,function(err,data){
                itemsURIs = data;
            });
        });
        setInterval(function(){funcs.getHistory(steamkey,steamBaseUri,heroes,itemsURIs,lodaKey,lodaHistory,'Loda',function(error,data){
            if(!err){
                console.log("updated Lodas matchHistory ");
                console.log(data);
            }
            else{
                console.log(err);
            }
        });},60000);
        setInterval(function(){funcs.getHistory(steamkey,steamBaseUri,heroes,itemsURIs,akkeKey,akkeHistory,'Akke',function(error,data){
            if(!err){
                console.log("updated Akkes matchHistory ");
                console.log(data);
            }
            else{
                console.log(err);
            }
        });},60000);
        setInterval(function(){funcs.getHistory(steamkey,steamBaseUri,heroes,itemsURIs,egmKey,egmHistory,'Egm',function(error,data){
            if(!err){
                console.log("updated Egms matchHistory ");
                console.log(data);
            }
            else{
                console.log(err);
            }
        });},60000);
        setInterval(function(){funcs.getHistory(steamkey,steamBaseUri,heroes,itemsURIs,bulldogKey,bulldogHistory,'Bulldog',function(error,data){
            if(!err){
                console.log("updated Bulldogs matchHistory ");
                console.log(data);
            }
            else{
                console.log(err);
            }
        });},60000);
        setInterval(function(){funcs.getHistory(steamkey,steamBaseUri,heroes,itemsURIs,s4Key,s4History,'s4',function(error,data){
            if(!err){
                console.log("updated s4s matchHistory ");
                console.log(data);
            }
            else{
                console.log(err);
            }
        });},60000);
    }
});


app.get("/", function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log("Request from " + ip + " for " + req.path);
    res.sendfile(path.resolve('../index.html'));
});

/* serves all the static files */
app.use(express.static('../'));

app.get("/api/match/History/:member", function (req, res) {
    console.log('request for : ' + req.param("member") + " matchhistory");
    var memberreq = req.param("member");

    if(memberreq === 'Loda'){
        res.send(lodaHistory);
    }else if(memberreq === 'Akke'){
        res.send(akkeHistory);
    }
    else if(memberreq === 'Egm'){
        res.send(egmHistory);
    }
    else if(memberreq === 'Bulldog'){
        res.send(bulldogHistory);
    }
    else if(memberreq === 's4'){
        res.send(s4History);
    }

});

app.listen(8080);

console.log("App listening on port 8080");
