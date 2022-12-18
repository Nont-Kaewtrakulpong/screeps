/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.pump');
 * mod.thing == 'a thing'; // true
 */

var rolePump = {
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            sourceNumber = creep.name.charAt(creep.name.length-1)
            if(creep.harvest(sources[sourceNumber]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceNumber], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    }
}

module.exports = rolePump;