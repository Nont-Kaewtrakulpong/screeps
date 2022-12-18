var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, containerID) {
        
        var container = Game.getObjectById(containerID)

        //if
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
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
	    }
	    else {
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder; 