var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolePump = require('role.pump');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var tower = Game.getObjectById('89220d96b7ef7225b60f7911');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    var allCreeps = Game.creeps;
    
    var harvesters = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(allCreeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(allCreeps, (creep) => creep.memory.role == 'builder');
    var pumps = _.filter(allCreeps, (creep) => creep.memory.role == 'pump');
    
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    else if(upgraders.length < 0) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    else if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    else if(pumps.length < 0){
        var newName = 'Pump' + Game.time;
        console.log('Spawning new pump: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'pump'}});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'pump') {
            rolePump.run(creep, 1)
        }
    }
}