/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.expansionbuilder');
 * mod.thing == 'a thing'; // true
 */
var roleExpansionBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, sourceID) {
        //var source = Game.getObjectById(sourceID);
        if(creep.room != Game.flags['Expansion1'].room) {
            const route = Game.map.findRoute(creep.room, Game.flags['Expansion1'].room 
            // , {
            //     routeCallback(roomName, fromRoomName) {
            //         if(roomName == 'E33N36' || roomName == 'E34N36') {    // avoid this room
            //             return Infinity;
            //         }
            //     return 1;
            // }}
            );
            //creep.say(route[0].room);
            if(route.length > 0) {
                console.log('Now heading to room ' + route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
            creep.memory.building = false;
        }
        else{
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
	        }
	        else if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	            creep.memory.building = true;
	            creep.say('🚧 build');
            }

	        else if(creep.memory.building) {
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    var needRep = creep.room.find(FIND_STRUCTURES, {
                            filter: object => object.hits < object.hitsMax
                        });

                        if(needRep.length > 0) {
                
                            needRep.sort((first,second) => first.hits/first.hitsMax - second.hits/second.hitsMax);
                
                            if(creep.repair(needRep[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(needRep[0], {visualizePathStyle: {stroke: '#ffffff'}});    
                            }
                        }
                }
	        }
	        else {
	           // var source = Game.getObjectById(sourceID);
	           // var result = creep.harvest(source);
            //     if(result == ERR_NOT_IN_RANGE || result < 0) {
            //         if(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) == ERR_NO_PATH){
            //             creep.move(BOTTOM_RIGHT);
            //         };
            //     }
                var source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
	        }
        }
    }
};

module.exports = roleExpansionBuilder;