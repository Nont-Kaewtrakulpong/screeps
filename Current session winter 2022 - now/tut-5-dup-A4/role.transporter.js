/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */

var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        })

        var container = containers[creep.name.charAt(creep.name.length-1)];
        roomTarget = container.room;
        roomInit = Game.spawns["Spawn1"].room;
        
        if(creep.memory.transporting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transporting = false;
            creep.say('withdraw');
	    }
	    if(!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.transporting = true;
	        creep.say('transport');
	    }
        
        if(creep.memory.transporting && creep.room != roomTarget) {
            var exit = creep.room.findExitTo(roomTarget);
            creep.moveTo(creep.pos.findClosestByPath(exit), {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else if (!creep.memory.transporting){
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if (creep.room != roomInit && creep.memory.transporting){
            var exit = creep.room.findExitTo(roomInit);
            creep.moveTo(creep.pos.findClosestByPath(exit), {visualizePathStyle: {stroke: '#ffffff'}});
            //creep.moveTo(creep.room.findExitTo(creep.memory.target));
        }
        else {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                })
                
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                
                else {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                        }
                    })
                
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
	}
};

module.exports = roleTransporter;