/**
 * Created by jsvhqr on 22/04/16.
 */

function Player(player_slot, hero, items, kda, gold, cs, gpm, xpm, hero_dmg, tower_dmg, hero_healing, level, is_member,is_dire){

    this.player_slot = player_slot;
    this.hero = hero;
    this.items = items;
    this.kda = kda;
    this.gold = gold;
    this.gpm = gpm;
    this.xpm = xpm;
    this.hero_dmg = hero_dmg;
    this.tower_dmg = tower_dmg;
    this.hero_healing = hero_healing;
    this.level = level;
    this.is_member = is_member;
    this.is_dire = is_dire;


}

module.exports = Player;