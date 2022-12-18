var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
            
        if(targets.length == 0){
            if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, range: 3});
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    var container = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
                    filter: (structures) => {
                        return structures.structureType == STRUCTURE_CONTAINER;
                    }
                    }));
                if(!container){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                    creep.harvest(sources[0])
                }
                
                else if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                } 
                }
            }
        }
        else{
            if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                var container = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
                    filter: (structures) => {
                        return structures.structureType == STRUCTURE_CONTAINER;
                    }
                }));
                if(!container){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                    creep.harvest(sources[0])
                }
                
                else if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                // (creep.withdraw(Game.getObjectById('62be4e4c8b83203976bf3ca6')));
                console.log(creep.pickup(RESOURCE_ENERGY))
            }
        }
        else {
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
    }
};

module.exports = roleHarvester;