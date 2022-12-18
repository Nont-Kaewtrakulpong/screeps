/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.reserver');
 * mod.thing == 'a thing'; // true
 */

var roleReserver = {

    /* @param {Creep} creep */
    run: function(creep) {
        if(creep.room == Game.spawns.Spawn1.room) {
            creep.moveTo(creep.pos.findClosestByPath(FIND_EXIT_RIGHT));
        }
        else{
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleReserver;