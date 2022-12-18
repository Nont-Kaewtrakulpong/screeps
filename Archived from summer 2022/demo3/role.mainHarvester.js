/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.mainHarvester');
 * mod.thing == 'a thing'; // true
 */

var roleDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, linkID, sourceID) {
        
        var link = Game.getObjectById(linkID);
        var sourceEnergy = Game.getObjectById(sourceID);
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

module.exports = {

};