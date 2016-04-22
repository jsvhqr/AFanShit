/**
 * Created by jsvhqr on 22/04/16.
 */

function Player(account_id, player_slot, hero_id, items, kills, deaths, assists, leaver_status, gold, lasthits, denies, gold_per_min, xp_per_min, hero_dmg, tower_dmg, hero_healing, level, ability_upgrades, additional_units){

    this.accound_id = account_id;
    this.player_slot = player_slot;
    this.hero_id = hero_id;
    this.items = items;
    this.kills = kills;
    this.deaths = deaths;
    this.assists = assists;
    this.leaver_status = leaver_status;
    this.gold = gold;
    this.lasthits = lasthits;
    this.denies = denies;
    this. gold_per_min = gold_per_min;
    this.xp_per_min = xp_per_min;
    this.hero_dmg = hero_dmg;
    this.tower_dmg = tower_dmg;
    this.hero_healing = hero_healing;
    this.level = level;
    this.ability_upgrades = ability_upgrades;
    this.additional_units = additional_units;


}

module.export = Player;