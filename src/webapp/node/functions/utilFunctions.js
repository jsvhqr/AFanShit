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

    getMatchType = function (lobby_type) {

        switch (lobby_type) {
            case 0 :
                return "Public matchmaking";
            case 1 :
                return "Practise";
            case 2 :
                return  "Tournament game";
            case 3 :
                return  "Tutorial ";
            case 4 :
                return  "Bot game";
            case 5 :
                return  "Team match";
            case 6 :
                return  "Solo queue";
            case 7 :
                return  "Ranked matchmaking";
            default:
                return "1v1 Solo mid";

        }

    }

    module.exports.getHeroPlayed = getHeroPlayed;

    module.exports.isMember = isMember;

    module.exports.item = item;

    module.exports.isDire = isDire;

    module.exports.getMatchType = getMatchType;