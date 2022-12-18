/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('building.tower');
 * mod.thing == 'a thing'; // true
 */

var buildingTower = {
    /** @param {Tower} tower **/
    run: function(tower) {
        //find closest hostile creeps and attack
        var hostileCreeps = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostileCreeps){
            tower.attack(hostileCreeps);
        }
        //if cant find hostiles, heal itself
        else if(tower.hits < tower.hitsMax){
            tower.repair(tower);
        }
        //if cant heal itself, heal others
        else {
            //heal friendly creeps first
            var thisRoom = tower.room;
            var creepToHeal = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: (creep) => (creep.hits < creep.hitsMax)
                });
            if(creepToHeal){
                tower.heal(creepToHeal);
            }
            //if energy is above certain amount, find buildings except walls
            else if(tower.store['energy'] >= tower.store.getCapacity('energy')*0.5){
                
                var buildingsToHeal = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax/4) && 
                                structure.structureType != STRUCTURE_WALL &&
                                structure.structureType != STRUCTURE_RAMPART;
                    }
                });
                
                //if buildings are found heal them
                if(buildingsToHeal.length > 0){
                    buildingsToHeal.sort((first,second) => first.hits/first.hitsMax - second.hits/second.hitsMax);
                    tower.repair(buildingsToHeal[0]);
                }
            }
        }
    }
}

module.exports = buildingTower;