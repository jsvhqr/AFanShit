/**
 * Created by jsvhqr on 2016-04-23.
 */

getHeroPlayed = function(id,hs) {
    for(var i = 0; i < hs.length; i++){
        if(hs[i].id === id){
            return hs[i].name;
        }
    }
    return "unknown";
}

module.exports.getHeroPlayed = getHeroPlayed;