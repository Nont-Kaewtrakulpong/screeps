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
        
        const container = Game.getObjectById(containerID);
        const source = Game.getObjectById(sourceID);
        roomTarget = source.room;
        
        if(creep.room != roomTarget) {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(roomTarget)), {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else{
            if(creep.store.getFreeCapacity() > 0) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
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