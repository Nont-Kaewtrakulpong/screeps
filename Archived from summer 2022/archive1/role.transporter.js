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
        
        const storage = Game.getObjectById(storageID);
        
        if(creep.room == Game.spawns.Spawn1.room && creep.store.getFreeCapacity() > 0) {
            creep.moveTo(creep.pos.findClosestByPath(FIND_EXIT_RIGHT));
        }
        else if (creep.store.getFreeCapacity() > 0){
            var container = Game.getObjectById(containerID);
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if (creep.room != Game.spawns.Spawn1.room && creep.store.getFreeCapacity() == 0){
            creep.memory.target = storage.room.roomName;
            creep.moveTo(creep.pos.findClosestByPath(FIND_EXIT_LEFT));
            //creep.moveTo(creep.room.findExitTo(creep.memory.target));
        }
        else {
            
            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
	}
};

module.exports = roleTransporter;