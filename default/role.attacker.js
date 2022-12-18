/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attacker');
 * mod.thing == 'a thing'; // true
 */

var roleAttacker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.room == Game.flags['Expansion1'].room){
            var hostiles = creep.room.find(FIND_HOSTILE_SPAWNS);
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0]);
            }
        }
        else{
            if (creep.pos.roomName != 'E33N35' || creep.pos.roomName != 'E32N35' || creep.pos.roomName !='E32N36'){
                creep.moveTo(new RoomPosition(1, 23, Game.flags['Expansion1'].pos.roomName));
            }
            if(creep.pos.roomName == 'E33N35'){
                creep.moveTo(new RoomPosition(1, 23, 'E32N35'));
            }
            else if(creep.pos.roomName == 'E32N35'){
                creep.moveTo(new RoomPosition(1, 23, 'E32N36'));
            }
            else if(creep.pos.roomName == 'E32N36'){
                creep.moveTo(new RoomPosition(25, 25, 'E32N37'));
            }
            // var exit = creep.room.findExitTo(Game.flags['Expansion1'].room);
            // creep.moveTo(creep.pos.findClosestByPath(exit));
            //creep.moveTo(new RoomPosition(1, 23, Game.flags['Expansion1'].pos.roomName));
        }
    }
}


module.exports = roleAttacker