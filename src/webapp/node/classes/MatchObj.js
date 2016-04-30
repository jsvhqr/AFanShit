/**
 * Created by gnomer_fedora on 2016-04-11.
 */


function MatchObject(hero, match_type, result, start_time, kda, details) {

    this.hero = hero;
    this.match_type = match_type;
    this.result = result;
    this.start_time = start_time;
    this.kda = kda;
    this.details = details;

}

module.exports = MatchObject;