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


itemURI = function (itemID, itemsAndUris) {
    
    for(var i = 0;i<itemsAndUris.length;i++){
        if(itemID == itemsAndUris[i].id){
            return itemsAndUris[i].uri;
        }
    }

}

isDire = function(a,b){
    return a == b;
}

module.exports.getHeroPlayed = getHeroPlayed;

module.exports.isMember = isMember;

module.exports.itemURI = itemURI;

module.exports.isDire = isDire;