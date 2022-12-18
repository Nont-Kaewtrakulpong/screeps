/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   // if(creep.store[RESOURCE_ENERGY] == 0) {
    //         var sources = creep.room.find(FIND_SOURCES);
    //         if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(sources[0]);
    //         }
    //     }
    //     else {
    //         if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(creep.room.controller);
    //         }
    //     }
    	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleUpgrader;