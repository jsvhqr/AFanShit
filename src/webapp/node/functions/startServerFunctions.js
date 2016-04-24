/**
 * Created by jsvhqr on 2016-04-23.
 */
var request = require('request');
var heroReference = require('../classes/Hero.js');
var util = require('../functions/utilFunctions.js');
var matchObjectReference = require('../classes/MatchObj.js');


var getHerosAndMatchHistory = function (steamkey,steamBaseUri,heroes, lodaKey, akkeKey, egmKey,bulldogKey,s4Key,lodaHistory, akkeHistory, egmHistory, bulldogHistory, s4History) {
    request(steamBaseUri + "/IEconDOTA2_570/GetHeroes/v001/?key=" + steamkey + "&language=english", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonHeros = JSON.parse(body);
            for (var i = 0; i < jsonHeros.result.heroes.length; i++) {
                var substr = jsonHeros.result.heroes[i].name.substring(14);
                console.log("Added new hero to memorydb: name " + substr + " id: " + jsonHeros.result.heroes[i].id);
                var h = new heroReference(jsonHeros.result.heroes[i].id, substr);
                heroes.push(h);
            }
        }
        getHistory(steamkey,steamBaseUri, heroes, lodaKey,'Loda',lodaHistory);
        getHistory(steamkey,steamBaseUri, heroes, akkeKey,'Akke',akkeHistory);
        getHistory(steamkey,steamBaseUri, heroes, egmKey,'Egm',egmHistory);
        getHistory(steamkey,steamBaseUri, heroes, bulldogKey,'Bulldog',bulldogHistory);
        getHistory(steamkey,steamBaseUri, heroes, s4Key,'s4',s4History);
    });
}

var getHistory = function(steamKey, steamBaseURI, heroes, memberkey, member, memberHistory){
        request(steamBaseURI + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamKey + "&account_id=" + memberkey, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if (jsonMatchHistory.result.status !== 15) {
                    memberHistory = new Array();
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
                            if (jsonMatchHistory.result.matches[i].players[j].account_id == memberkey) {
                                hero = util.getHeroPlayed(jsonMatchHistory.result.matches[i].players[j].hero_id, heroes);
                            }
                        }

                        var match = new matchObjectReference(hero, lobby_type, matchid);
                        console.log("Added match to " + member + 's History');
                        memberHistory.push(match);

                    }
                }

            }

            console.log(memberHistory);
        });

}


module.exports.getHerosAndMatchHistory = getHerosAndMatchHistory;