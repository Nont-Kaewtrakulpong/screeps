/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing == 'a thing'; // true
 */

var roleGuard = {
    /** @param {Creep} creep **/
    run: function(creep, attackers) {
        if(!creep.memory.attacking && attackers.length > 0){
            creep.memory.attacking = true;
        }
        else if(creep.memory.attacking && attackers.length == 0){
            creep.memory.attacking = false;
        }
        if(creep.memory.attacking){
            if(creep.room != attackers[0].room) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(attackers[0].room)), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if (creep.hits < creep.hitsMax/10){
                
            }
        }
    }
}