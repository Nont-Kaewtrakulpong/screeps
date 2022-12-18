/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.distanceBuilder');
 * mod.thing == 'a thing'; // true
 */

var roleDistanceBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room == Game.spawns.Spawn1.room) {
            creep.moveTo(creep.pos.findClosestByPath(FIND_EXIT_RIGHT));
        }
        else{
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
	        }
	        
	        else if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	            creep.memory.building = true;
	            creep.say('🚧 build');
	        }

	        else if(creep.memory.building) {
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length > 0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    var needRep = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax
                    });

                    if(needRep.length > 0) {
                
                        needRep.sort((first,second) => first.hits/first.hitsMax - second.hits/second.hitsMax);
                
                        if(creep.repair(needRep[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(needRep[0], {visualizePathStyle: {stroke: '#ffffff'}});    
                        }
                    }
                }
            }
            
            else {
            //     var containerID = '62c2a38aa87fbb6b826d4e15';
	           // var container = Game.getObjectById(containerID);
            //     if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
            var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
	        }
        }   
    }
}

module.exports = roleDistanceBuilder;
