/**
 * Created by jsvhqr on 2016-04-23.
 */
var request = require('request');
var heroReference = require('../classes/Hero.js');
var util = require('../functions/utilFunctions.js');
var matchObjectReference = require('../classes/MatchObj.js');
var playerReference = require('../classes/Player');
var matchdetailsReference = require('../classes/MatchDetails');
var itemsReference = require('../classes/Item.js');


var getItems = function (steamKey,steamBaseUri, callback) {

    request(steamBaseUri + "IEconDOTA2_570/GetGameItems/v001/?key=" + steamKey + "&language=english", function (error, response, body) {
        if (!error && response && response.statusCode === 200) {
            var jsonItems = JSON.parse(body);
            var items = new Array();
            for(var i=0;i<jsonItems.result.items.length;i++){
                var substr = jsonItems.result.items[i].name.substring(5);
                console.log("Added new item to memorydb, name: " + substr +" id: " + jsonItems.result.items[i].id);
                var item = new itemsReference(jsonItems.result.items[i].id,substr);
                items.push(item);
            }
            callback(null,items);
        }
        else{
            callback("error",null);
        }
    });

    
}

var getHeros = function (steamkey,steamBaseUri,callback) {
    request(steamBaseUri + "/IEconDOTA2_570/GetHeroes/v001/?key=" + steamkey + "&language=english", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var heroes = new Array();
            var jsonHeros = JSON.parse(body);
            for (var i = 0; i < jsonHeros.result.heroes.length; i++) {
                var substr = jsonHeros.result.heroes[i].name.substring(14);
                console.log("Added new hero to memorydb: name " + substr + " id: " + jsonHeros.result.heroes[i].id);
                var h = new heroReference(jsonHeros.result.heroes[i].id, substr);
                heroes.push(h);
            }
        }
        callback(null,heroes);
    });
}

var getHistory = function(steamKey, steamBaseURI, heroes, items, memberkey, callback){
        var memberHistory = new Array();
        var length;
        var done = 0;
        request(steamBaseURI + "IDOTA2Match_570/GetMatchHistory/V001/?key=" + steamKey + "&account_id=" + memberkey, function (error, response, body) {
            if (!error && response && response.statusCode === 200) {
                var jsonMatchHistory = JSON.parse(body);
                if (jsonMatchHistory.result.status !== 15) {
                    length = jsonMatchHistory.result.matches.length;
                    for (var i = 0; i < jsonMatchHistory.result.matches.length; i++) {
                        var currentMatch = jsonMatchHistory.result.matches[i];
                        createMatchObject(steamKey,steamBaseURI,heroes,items,memberkey,currentMatch.match_id,function(err,result){
                            if(!err){
                                done = done + 1;
                                if(result !== null){
                                    memberHistory.push(result);
                                }
                                console.log(result);
                                if(length === done){
                                    callback(null,memberHistory);
                                }
                                console.log(done);
                            }else{
                                done = done + 1;
                                console.log(err);
                                console.log(done);
                            }
                        })
                    }

                }
            }
            else{
                console.log("response not 200");
                if(response){
                    console.log(response.statusCode);
                }
            }
        });
}

var createMatchObject = function(steamKey, steamBaseURI, heroes, items, memberkey, match_id, callback){

    request(steamBaseURI + "IDOTA2Match_570/GetMatchDetails/V001/?key=" + steamKey + "&match_id=" + match_id, function (error, response, body) {

        var matchObject;
        var hero;
        var match_type;
        var start_time;
        var result_win;
        var kda;
        var details;
        var matchid;

        var players = new Array();

        if (!error && response && response.statusCode === 200) {
            var jsonMatchDetails = JSON.parse(body);
            if(jsonMatchDetails.result.status !== 15){

                match_type = util.getMatchType(jsonMatchDetails.result.lobby_type);
                start_time = jsonMatchDetails.result.start_time;
                matchid = match_id;

                for(var i = 0; i<jsonMatchDetails.result.players.length; i++) {

                    var currentplayer = jsonMatchDetails.result.players[i];

                    var this_player_slot = currentplayer.player_slot & 248;
                    var this__player_hero = getHeroPlayed(currentplayer.hero_id,heroes);
                    var this_player_kda = currentplayer.kills + "/" + currentplayer.deaths + "/" + currentplayer.assists;
                    var this_player_cs = currentplayer.last_hits + "/" + currentplayer.denies;
                    var this_player_gold = currentplayer.gold;
                    var this_player_gpm = currentplayer.gold_per_min;
                    var this_player_xpm = currentplayer.xp_per_min;
                    var this_player_hero_dmg = currentplayer.hero_damage;
                    var this_player_tower_dmg = currentplayer.tower_damage;
                    var this_player_hero_healing = currentplayer.hero_healing;
                    var this_player_level = currentplayer.level ;
                    var is_member = isMember(memberkey,currentplayer.account_id);
                    var is_dire =  isDire(currentplayer.player_slot & 128, 1);

                    var this_player_items = new Array();
                    this_player_items.push(util.item(currentplayer.item_0,items));
                    this_player_items.push(util.item(currentplayer.item_1,items));
                    this_player_items.push(util.item(currentplayer.item_2,items));
                    this_player_items.push(util.item(currentplayer.item_3,items));
                    this_player_items.push(util.item(currentplayer.item_4,items));
                    this_player_items.push(util.item(currentplayer.item_5,items));

                    players.push(new playerReference(this_player_slot,this__player_hero,this_player_items,this_player_kda,this_player_gold,this_player_cs,this_player_gpm,this_player_xpm,this_player_hero_dmg,this_player_tower_dmg,this_player_hero_healing,this_player_level,is_member,is_dire));


                }
                details = new matchdetailsReference(players,jsonMatchDetails.result.duration, jsonMatchDetails.result.leagueid,jsonMatchDetails.result.positive_votes,jsonMatchDetails.result.negative_votes,jsonMatchDetails.result.picks_bans,jsonMatchDetails.result.radiant_score,jsonMatchDetails.result.dire_score);
                for(var j = 0; j<details.players.length;j++){
                    if(details.players[j].is_member){
                        hero = details.players[j].hero;
                        if(!details.players[j].is_dire && jsonMatchDetails.result.radiant_win){
                            result_win = true;
                        }else if(details.players[j].is_dire && !jsonMatchDetails.result.radiant_win){
                            result_win = true;
                        }
                        else {
                            result_win = false;
                        }
                        kda = details.players[j].kda;
                        break;
                    }
                }

                matchObject = new matchObjectReference(hero,match_type,result_win,start_time,kda,details,matchid);

                callback(null,matchObject);

            }else{
                callback("status of result " + jsonMatchDetails.result.status,null);
            }
        }else{
            callback(error,null);
        }
    });

}




module.exports.getHeros = getHeros;
module.exports.getHistory = getHistory;
module.exports.getItems = getItems;