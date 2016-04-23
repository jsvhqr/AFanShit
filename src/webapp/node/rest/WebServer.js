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
var matchDetails = new Array();
var matchDetailsReference = require('../classes/MatchDetails');
var funcs = require('../functions/startServerFunctions');
var util = require('../functions/utilFunctions.js');
var matchObjectReference = require('../classes/MatchObj.js');


funcs.getHeros(steamkey,steamBaseUri,heroes);


app.get("/", function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log("Request from " + ip + " for " + req.path);
    res.sendfile(path.resolve('../index.html'));
});

/* serves all the static files */
app.use(express.static('..'));

app.get("/api/match/History/:member", function (req, res) {
    console.log('request for : ' + req.param("member") + " matchhistory");
    var memberreq = req.param("member");
    var keytouse;
    if(memberreq === 'Loda'){
        keytouse = lodaKey;
    }else if(memberreq === 'Akke'){
        keytouse = akkeKey;
    }
    else if(memberreq === 'Egm'){
        keytouse = egmKey;
    }
    else if(memberreq === 'Bulldog'){
        keytouse = bulldogKey;
    }
    else if(memberreq === 's4'){
        keytouse = s4Key;
    }
    request(steamBaseUri + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamkey + "&account_id=" + keytouse, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonMatchHistory = JSON.parse(body);
            if (jsonMatchHistory.result.status !== 15) {
                var history = new Array();
                for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {

                    var hero;
                    var lobby_type;
                    var matchid;

                    matchid = jsonMatchHistory.result.matches[i].match_id;
                    switch (jsonMatchHistory.result.matches[i].lobby_type) {
                        case 0 :
                            lobby_type = "Public matchmaking"
                            break;
                        case 1 :
                            lobby_type = "Practise"
                            break;
                        case 2 :
                            lobby_type = "Tournament game"
                            break;
                        case 3 :
                            lobby_type = "Tutorial "
                            break;
                        case 4 :
                            lobby_type = "Bot game"
                            break;
                        case 5 :
                            lobby_type = "Team match"
                            break;
                        case 6 :
                            lobby_type = "Solo queue"
                            break;
                        case 7 :
                            lobby_type = "Ranked matchmaking"
                            break;
                        default:
                            lobby_type = "1v1 Solo mid"

                    }

                    for (var j = 0; j < jsonMatchHistory.result.matches[i].players.length; j++) {
                        if (jsonMatchHistory.result.matches[i].players[j].account_id == keytouse) {
                            hero = util.getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id, heroes);
                        }
                    }

                    var match = new matchObjectReference(hero, lobby_type, matchid);
                    history.push(match);

                }

                var json = JSON.stringify(history);
                res.send(json);
            }
            else {
                console.log("something is wrong :/ " + response.statusCode + " " + error);
                res.send([]);
            }

        } else {
            console.log("something is wrong :/ " + response.statusCode + " " + error);
            res.send([]);
        }
    });
});

app.get("/api/match/Details/:id", function (req, res) {

    console.log('request for : ' + req.param("id") + " matchdetails");

    var matchID = req.param("id");

    request(steamBaseUri + "IDOTA2Match_570/GetMatchDetails/V001/?match_id=" + matchID + "&key=" + steamkey, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var jsonMatchDetails = JSON.parse(body);
            if(jsonMatchDetails.result.status !== 15){
                var matchDetails = new matchDetailsReference(jsonMatchDetails.result.players,jsonMatchDetails.result.radiant_win,jsonMatchDetails.result.duration,jsonMatchDetails.result.start_time,jsonMatchDetails.result.leagueid,jsonMatchDetails.result.positive_votes,jsonMatchDetails.result.negative_votes,jsonMatchDetails.result.game_mode,jsonMatchDetails.result.pick_bans,jsonMatchDetails.result.radiant_score,jsonMatchDetails.result.dire_score);
                var json = JSON.stringify(matchDetails);
                res.send(json);
            }
            else{
                res.send([]);
                console.log("something is wrong :/ " + response.statusCode + " "  + error);
            }
        }
        else{
            console.log("error http :" + response.statusCode);
        }

    });


});

app.listen(8080);

console.log("App listening on port 8080");
