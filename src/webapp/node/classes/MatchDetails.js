/**
 * Created by jsvhqr on 22/04/16.
 */

function MatchDetails(players, radiant_win, duration, start_time, leagueid, positive_votes, negative_votes, game_mode, picks_bans, radiant_score, dire_score){

    this.players = players;
    this.radiant_win = radiant_win;
    this.duration = duration;
    this.start_time = start_time;
    this.leagueid = leagueid;
    this.positive_votes = positive_votes;
    this.negative_votes = negative_votes;
    this.game_mode = game_mode;
    this.pick_bans = picks_bans;
    this.radiant_score = radiant_score;
    this.dire_score = dire_score;

}

module.exports = MatchDetails;