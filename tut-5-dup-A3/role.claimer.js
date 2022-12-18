/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

var roleClaimer = {

    /* @param {Creep} creep */
    run: function(creep) {
        var attackers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return creep.getActiveBodyparts(ATTACK) +  creep.getActiveBodyparts(RANGED_ATTACK) > 0;
            }
        })
        if(creep.pos.roomName == Game.flags['Expansion1'].pos.roomName){
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
        else{
            const route = Game.map.findRoute(creep.room, Game.flags['Expansion1'].room, {
                routeCallback(roomName, fromRoomName) {
                    if(roomName == 'E33N36' || roomName == 'E34N36') {    // avoid this room
                        return Infinity;
                    }
                return 1;
            }});
            if(route.length > 0) {
                console.log('Now heading to room '+route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
    }
    
}

module.exports = roleClaimer;