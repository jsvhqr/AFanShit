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
var items = new Array();
var funcs = require('../functions/startServerFunctions');
var lodaHistory = new Array();
var akkeHistory = new Array();
var egmHistory = new Array();
var bulldogHistory = new Array();
var s4History = new Array();
var util = require('../functions/utilFunctions');

funcs.getHeros(steamkey,steamBaseUri, function(err, resheros){
    if(err){
        console.log(err);
    }else{
        heroes = resheros;
        funcs.getItems(steamkey,steamBaseUri,function(err,resitems){
            items = resitems;
            funcs.getHistory(steamkey,steamBaseUri,heroes,items,lodaKey,function(error,data){
                if(!err){
                    console.log("updated Lodas matchHistory ");
                    lodaHistory = data;
                    console.log(data);
                    lodaHistory.sort(util.compare);
                    setInterval(function(){
                        funcs.updateHistory(steamkey, steamBaseUri, heroes, items, lodaKey, function(err,data){
                            lodaHistory.concat(data);
                            _.uniq(lodaHistory);
                        });
                    },60000);
                }
                else{
                    console.log(err);
                }
            });
            funcs.getHistory(steamkey,steamBaseUri,heroes,items,akkeKey,function(error,data){
                if(!err){
                    console.log("updated Akkes matchHistory ");
                    akkeHistory = data;
                    console.log(data);
                    akkeHistory.sort(util.compare);
                    setInterval(function(){
                        funcs.updateHistory(steamkey, steamBaseUri, heroes, items, akkeKey, function(err,data){
                            akkeHistory.concat(data);
                            _.uniq(akkeHistory);
                        });
                    },60000);
                }
                else{
                    console.log(err);
                }
            });
            funcs.getHistory(steamkey,steamBaseUri,heroes,items,egmKey,function(error,data){
                if(!err){
                    console.log("updated Egms matchHistory ");
                    egmHistory = data;
                    console.log(data);
                    egmHistory.sort(util.compare);
                    setInterval(function(){
                        funcs.updateHistory(steamkey, steamBaseUri, heroes, items, egmKey, function(err,data){
                            egmHistory.concat(data);
                            _.uniq(egmHistory);
                        });
                    },60000);
                }
                else{
                    console.log(err);
                }
            });
            funcs.getHistory(steamkey,steamBaseUri,heroes,items,bulldogKey,function(error,data){
                if(!err){
                    console.log("updated Bulldogs matchHistory ");
                    bulldogHistory = data;
                    console.log(data);
                    bulldogHistory.sort(util.compare);
                    setInterval(function(){
                        funcs.updateHistory(steamkey, steamBaseUri, heroes, items, bulldogKey, function(err,data){
                            bulldogHistory.concat(data);
                            _.uniq(bulldogHistory);
                        });
                    },60000);
                }
                else{
                    console.log(err);
                }
            });
            funcs.getHistory(steamkey,steamBaseUri,heroes,items,s4Key,function(error,data){
                if(!err){
                    console.log("updated s4s matchHistory ");
                    s4History = data;
                    console.log(data);
                    s4History.sort(util.compare);
                    setInterval(function(){
                        funcs.updateHistory(steamkey, steamBaseUri, heroes, items, s4Key, function(err,data){
                            s4History.concat(data);
                            _.uniq(s4History);
                        });
                    },60000);
                }
                else{
                    console.log(err);
                }
            });
        });

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
