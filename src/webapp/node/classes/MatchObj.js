/**
 * Created by gnomer_fedora on 2016-04-11.
 */


function MatchObject(hero, match_type, result_win, start_time, kda, details, match_id) {

    this.hero = hero;
    this.match_type = match_type;
    this.result_win = result_win;
    this.start_time = start_time;
    this.kda = kda;
    this.details = details;
    this.match_id = match_id;

}

module.exports = MatchObject;