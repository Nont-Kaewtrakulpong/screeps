/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.janitor');
 * mod.thing == 'a thing'; // true
 */
 
//Give energy to turrets
//Repair buildings
//If free, upgrade
var roleJanitor = {
     /* @param {Creep} creep */
    run: function(creep, storageID) {
    
        if(creep.memory.cleaning && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.cleaning = false;
            creep.say('harvest');
        }
        else if(!creep.memory.cleaning && creep.store.getFreeCapacity() == 0) {
            creep.memory.cleaning = true;
            creep.say('clean');
        }

        else if(creep.memory.cleaning) {
            var unfilledTowers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        
            if(unfilledTowers.length > 0){
                closestTower = creep.pos.findClosestByPath(unfilledTowers);
                if(creep.transfer(closestTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTower, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax/3) && 
                                structure.structureType != STRUCTURE_WALL;
                    }
                });

                if(targets.length > 0) {
                
                    targets.sort((first,second) => first.hits/first.hitsMax - second.hits/second.hitsMax);
                
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});    
                    }
                }
            }
        }
        else {
            const dropped = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (drops) => {
                        return drops.amount>100;
                    }
            });
            if(dropped.length) {
                creep.moveTo(dropped[0]);
                creep.pickup(dropped[0]);
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                } 
                // var storage = Game.getObjectById(storageID);
                // if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                // }
            }
        }
    }
}

module.exports = roleJanitor;
