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
    run: function(creep, containerID, storageID) {
        
        var storage = Game.getObjectById(storageID);
        var container = Game.getObjectById(containerID);
        roomTarget = container.room;
        roomInit = storage.room;
        
        if(creep.room != roomTarget && creep.store.getFreeCapacity() > 0) {
            var exit = creep.room.findExitTo(roomTarget);
            creep.moveTo(creep.pos.findClosestByPath(exit), {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else if (creep.store.getFreeCapacity() > 0){
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if (creep.room != roomInit && creep.store.getFreeCapacity() == 0){
            var exit = creep.room.findExitTo(roomInit);
            creep.moveTo(creep.pos.findClosestByPath(exit), {visualizePathStyle: {stroke: '#ffffff'}});
            //creep.moveTo(creep.room.findExitTo(creep.memory.target));
        }
        else {
            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleTransporter;