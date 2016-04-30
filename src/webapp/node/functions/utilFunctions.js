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

isMember  = function(memberKey,account_id){
    return memberKey == account_id;
}


item = function (itemID, items) {
    
    for(var i = 0;i<items.length;i++){
        if(itemID == items[i].id){
            return items[i].name;
        }
    }

}

isDire = function(a,b){
    return a == b;
}

module.exports.getHeroPlayed = getHeroPlayed;

module.exports.isMember = isMember;

module.exports.item = item;

module.exports.isDire = isDire;