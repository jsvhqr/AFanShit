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
var heroes = new Array();
var heroReference = require('./classes/Hero.js');
var matchObjectReference = require('./classes/MatchObj.js');

function init(heros) {
    request(steamBaseUri + "/IEconDOTA2_570/GetHeroes/v001/?key=" + steamkey + "&language=english", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonHeros = JSON.parse(body);
            for (var i = 0; i < jsonHeros.result.heroes.length; i++) {
                console.log("Added new hero to memorydb: name " + jsonHeros.result.heroes[i].name + " id: " + jsonHeros.result.heroes[i].id);
                var hero = new heroReference(jsonHeros.result.heroes[i].id, jsonHeros.result.heroes[i].name);
                heros.push(hero);
            }
        }
    });
}

init(heroes);

function getHeroPlayed(id) {
    for(var i = 0; i < heroes.length; i++){
        if(heroes[i].id === id){
            return heroes[i].name;
        }
    }
    return "unknown";
}

app.get("/", function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log("Request from " + ip + " for " + req.path);
    res.sendfile(path.resolve('../index.html'));
});

/* serves all the static files */
app.use(express.static('../../webapp'));

app.get("/api/matchHistory/:member", function (req, res) {
    console.log('request for : ' + req.param("member") + " matchhistory");
    var memberreq = req.param("member");

    if (memberreq === 'Loda') {
        request(steamBaseUri + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamkey + "&account_id=" + lodaKey, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if(jsonMatchHistory.result.status !== 15){
                    var matches_info = new Array();
                    for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {

                        var hero;
                        var tournamentGame;
                        var matchid;

                        matchid = jsonMatchHistory.result.matches[i].match_id;

                        if (jsonMatchHistory.result.matches[i].lobby_type === 2) {
                            tournamentGame = true;
                        } else {
                            tournamentGame = false;
                        }

                        for(var j = 0; j < jsonMatchHistory.result.matches[i].players.length; j++){
                            if(jsonMatchHistory.result.matches[i].players[j].account_id == lodaKey){
                                hero = getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id);
                            }
                        }

                        var match = new matchObjectReference(hero,tournamentGame,matchid);
                        matches_info.push(match);

                    }

                    var json = JSON.stringify(matches_info);
                    return json;
                }
                else{
                    res.send(memberreq + " doesn't allow public match data :/");
                }

            }
        });
    } else if (memberreq === 's4') {
        request(steamBaseUri + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamkey + "&account_id=" + s4Key, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if(jsonMatchHistory.result.status !== 15){
                    var matches_info = new Array();
                    for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {

                        var hero;
                        var tournamentGame;
                        var matchid;

                        matchid = jsonMatchHistory.result.matches[i].match_id;

                        if (jsonMatchHistory.result.matches[i].lobby_type === 2) {
                            tournamentGame = true;
                        } else {
                            tournamentGame = false;
                        }

                        for(var j = 0; j < jsonMatchHistory.result.matches[i].players.length; j++){
                            if(jsonMatchHistory.result.matches[i].players[j].account_id == s4Key){
                                hero = getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id);
                            }
                        }

                        var match = new matchObjectReference(hero,tournamentGame,matchid);
                        matches_info.push(match);

                    }

                    var json = JSON.stringify(matches_info);
                    return json;
                }
                else{
                    res.send(memberreq + " doesn't allow public match data :/");
                }

            }
        });
    } else if (memberreq === 'Bulldog') {
        request(steamBaseUri + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamkey + "&account_id=" + bulldogKey, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if(jsonMatchHistory.result.status !== 15){
                    var matches_info = new Array();
                    for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {

                        var hero;
                        var tournamentGame;
                        var matchid;

                        matchid = jsonMatchHistory.result.matches[i].match_id;

                        if (jsonMatchHistory.result.matches[i].lobby_type === 2) {
                            tournamentGame = true;
                        } else {
                            tournamentGame = false;
                        }

                        for(var j = 0; j < jsonMatchHistory.result.matches[i].players.length; j++){
                            if(jsonMatchHistory.result.matches[i].players[j].account_id == bulldogKey){
                                hero = getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id);
                            }
                        }

                        var match = new matchObjectReference(hero,tournamentGame,matchid);
                        matches_info.push(match);

                    }

                    var json = JSON.stringify(matches_info);
                    res.send(json);
                }
                else{
                    res.send(memberreq + " doesn't allow public match data :/");
                }

            }
        });
    } else if (memberreq === 'Akke') {
        request(steamBaseUri + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamkey + "&account_id=" + akkeKey, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if(jsonMatchHistory.result.status !== 15){
                    var matches_info = new Array();
                    for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {

                        var hero;
                        var tournamentGame;
                        var matchid;

                        matchid = jsonMatchHistory.result.matches[i].match_id;

                        if (jsonMatchHistory.result.matches[i].lobby_type === 2) {
                            tournamentGame = true;
                        } else {
                            tournamentGame = false;
                        }

                        for(var j = 0; j < jsonMatchHistory.result.matches[i].players.length; j++){
                            if(jsonMatchHistory.result.matches[i].players[j].account_id == akkeKey){
                                hero = getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id);
                            }
                        }

                        var match = new matchObjectReference(hero,tournamentGame,matchid);
                        matches_info.push(match);

                    }

                    var json = JSON.stringify(matches_info);
                    return json;
                }
                else{
                    res.send(memberreq + " doesn't allow public match data :/");
                }

            }
        });
    } else if (memberreq === 'EGM') {
        request(steamBaseUri + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamkey + "&account_id=" + egmKey, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if(jsonMatchHistory.result.status !== 15){
                    var matches_info = new Array();
                    for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {

                        var hero;
                        var tournamentGame;
                        var matchid;

                        matchid = jsonMatchHistory.result.matches[i].match_id;

                        if (jsonMatchHistory.result.matches[i].lobby_type === 2) {
                            tournamentGame = true;
                        } else {
                            tournamentGame = false;
                        }

                        for(var j = 0; j < jsonMatchHistory.result.matches[i].players.length; j++){
                            if(jsonMatchHistory.result.matches[i].players[j].account_id == egmKey){
                                hero = getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id);
                            }
                        }

                        var match = new matchObjectReference(hero,tournamentGame,matchid);
                        matches_info.push(match);

                    }

                    var json = JSON.stringify(matches_info);
                    return json;
                }
                else{
                    res.send(memberreq + " doesn't allow public match data :/");
                }

            }
        });
    }
});

app.listen(8080);

console.log("App listening on port 8080");
