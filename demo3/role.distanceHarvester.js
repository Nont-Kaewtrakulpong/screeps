/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.distanceHarvester');
 * mod.thing == 'a thing'; // true
 */

var roleDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, containerID, sourceID) {
        
        var container = Game.getObjectById(containerID);
        var sourceEnergy = Game.getObjectById(sourceID);
        roomTarget = sourceEnergy.room;
        
        if(creep.room != roomTarget) {
            var exit = creep.pos.findClosestByPath(creep.room.findExitTo(roomTarget));
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else{
            if(creep.store.getFreeCapacity() > 0) {
                if(creep.harvest(sourceEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleDistanceHarvester;