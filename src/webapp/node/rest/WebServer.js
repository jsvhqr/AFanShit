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
var lodash = require('lodash');

funcs.getHeros(steamkey,steamBaseUri, function(error_heroes, resulting_heros){
    if(error_heroes){
        console.log(error_heroes);
    }else{
        heroes = resulting_heros;
        funcs.getItems(steamkey,steamBaseUri,function(error_items,resulting_items){
            if(!error_items){
                items = resulting_items;
                funcs.getHistory(steamkey,steamBaseUri,heroes,items,lodaKey,function(error_loda_history,loda_history){
                    if(!error_loda_history){
                        console.log("updated Lodas matchHistory ");
                        lodaHistory = loda_history;
                        console.log(loda_history);
                        lodaHistory.sort(util.compare);
                        setInterval(function(){
                            funcs.updateHistory(steamkey, steamBaseUri, heroes, items, lodaKey, lodaHistory[0].start_time, function(error_new_loda_history,new_loda_history){
                                if(!error_new_loda_history){
                                    lodaHistory.concat(new_loda_history);
                                    lodash.uniq(lodaHistory);
                                    lodaHistory.sort(util.compare);
                                }else{
                                    console.log(error_new_loda_history);
                                }
                            });
                        },60000);
                    }
                    else{
                        console.log(error_loda_history);
                    }
                });
                /*
                funcs.getHistory(steamkey,steamBaseUri,heroes,items,akkeKey,function(error_akke_history,akke_history){
                    if(!error_akke_history){
                        console.log("updated Akkes matchHistory ");
                        akkeHistory = akke_history;
                        console.log(akke_history);
                        akkeHistory.sort(util.compare);
                        setInterval(function(){
                            funcs.updateHistory(steamkey, steamBaseUri, heroes, items, akkeKey, akkeHistory[0].start_time, function(error_new_akke_history,new_akke_history){
                                if(!error_new_akke_history){
                                    akkeHistory.concat(new_akke_history);
                                    _.uniq(akkeHistory);
                                    akkeHistory.sort(util.compare);
                                }else{
                                    console.log(error_new_akke_history);
                                }
                            });
                        },60000);
                    }else{
                        console.log(error_akke_history);
                    }
                });
                funcs.getHistory(steamkey,steamBaseUri,heroes,items,egmKey,function(error_egm_history,egm_history){
                    if(!error_egm_history){
                        console.log("updated Egms matchHistory ");
                        egmHistory = egm_history;
                        console.log(egm_history);
                        egmHistory.sort(util.compare);
                        setInterval(function(){
                            funcs.updateHistory(steamkey, steamBaseUri, heroes, items, egmKey, egmHistory[0].start_time, function(error_new_egm_history,new_egm_history){
                                if(!error_new_egm_history){
                                    egmHistory.concat(new_egm_history);
                                    _.uniq(egmHistory);
                                    egmHistory.sort(util.compare);
                                }else{
                                    console.log(error_new_egm_history);
                                }
                            });
                        },60000);
                    }
                    else{
                        console.log(error_egm_history);
                    }
                });
                funcs.getHistory(steamkey,steamBaseUri,heroes,items,bulldogKey,function(error_bulldog_history,bulldog_history){
                    if(!error_bulldog_history){
                        console.log("updated Bulldogs matchHistory ");
                        bulldogHistory = bulldog_history;
                        console.log(bulldog_history);
                        bulldogHistory.sort(util.compare);
                        setInterval(function(){
                            funcs.updateHistory(steamkey, steamBaseUri, heroes, items, bulldogKey, bulldogHistory[0].start_time, function(error_new_bulldog_history,new_bulldog_history){
                                if(!error_new_bulldog_history){
                                    bulldogHistory.concat(new_bulldog_history);
                                    _.uniq(bulldogHistory);
                                    bulldogHistory.sort(util.compare);
                                }else{
                                    console.log(error_new_bulldog_history);
                                }
                            });
                        },60000);
                    }
                    else{
                        console.log(error_bulldog_history);
                    }
                });
                funcs.getHistory(steamkey,steamBaseUri,heroes,items,s4Key,function(error_s4_history,s4_history){
                    if(!error_s4_history){
                        console.log("updated s4s matchHistory ");
                        s4History = s4_history;
                        console.log(s4_history);
                        s4History.sort(util.compare);
                        setInterval(function(){
                            funcs.updateHistory(steamkey, steamBaseUri, heroes, items, s4Key, s4History[0].start_time, function(error_new_s4_history,new_s4_history){
                                if(!error_new_s4_history){
                                    s4History.concat(new_s4_history);
                                    _.uniq(s4History);
                                    s4History.sort(util.compare);

                                }else{
                                    console.log(error_new_s4_history);
                                }
                            });
                        },60000);
                    }
                    else{
                        console.log(error_s4_history);
                    }
                });
                */
            }else{
                console.log(error_items);
            }

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
