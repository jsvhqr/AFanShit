/**
 * Created by jsvhqr on 2016-04-23.
 */
var request = require('request');
var heroReference = require('../classes/Hero.js');



var getHeros = function (skey, suri, hs) {
    request(suri + "/IEconDOTA2_570/GetHeroes/v001/?key=" + skey + "&language=english", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonHeros = JSON.parse(body);
            for (var i = 0; i < jsonHeros.result.heroes.length; i++) {
                var substr = jsonHeros.result.heroes[i].name.substring(14);
                console.log("Added new hero to memorydb: name " + substr + " id: " + jsonHeros.result.heroes[i].id);
                var h = new heroReference(jsonHeros.result.heroes[i].id, substr);
                hs.push(h);
            }
        }
    });
}


module.exports.getHeros = getHeros;