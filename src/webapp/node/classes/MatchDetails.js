/**
 * Created by jsvhqr on 22/04/16.
 */

function Details(players, duration, leagueid, positive_votes, negative_votes, picks_bans, radiant_score, dire_score){

    this.players = players;
    this.duration = duration;
    this.leagueid = leagueid;
    this.positive_votes = positive_votes;
    this.negative_votes = negative_votes;
    this.pick_bans = picks_bans;
    this.radiant_score = radiant_score;
    this.dire_score = dire_score;

}

module.exports = Details;