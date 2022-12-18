var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleJanitor = require('role.janitor');
var roleReserver = require('role.reserver');
var roleTransporter = require('role.transporter');
var roleDistanceHarvester = require('role.distanceHarvester');
var roleDistanceBuilder = require('role.distanceBuilder');
var buildingTower = require('building.tower');


module.exports.loop = function () {
    
    var allCreeps = Game.creeps;
    
    var harvesters = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(allCreeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(allCreeps, (creep) => creep.memory.role == 'builder');
    var janitors = _.filter(allCreeps, (creep) => creep.memory.role == 'janitor');
    var reservers = _.filter(allCreeps, (creep) => creep.memory.role == 'reserver');
    var transporters = _.filter(allCreeps, (creep) => creep.memory.role == 'transporter');
    var distanceHarvesters = _.filter(allCreeps, (creep) => creep.memory.role == 'distanceHarvester');
    var distanceBuilders = _.filter(allCreeps, (creep) => creep.memory.role == 'distanceBuilder');

    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Builders: ' + builders.length);
    console.log('Janitors: ' + janitors.length);
    console.log('Reservers: ' + reservers.length);
    console.log('Transporters: ' + transporters.length);
    console.log('Distance Builders: ' + distanceBuilders.length);
    console.log('Distance Harvesters: ' + distanceHarvesters.length);
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var spawn = Game.spawns['Spawn1'];
    
    var attackers = spawn.room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.getActiveBodyparts(ATTACK) +  creep.getActiveBodyparts(RANGED_ATTACK) > 0;
        }
    });
    
    if(attackers.length > 0){
        
    }

    if(harvesters.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    
    else if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    
    else if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    
    else if(janitors.length < 2) {
        var newName = 'Janitor' + Game.time;
        console.log('Spawning new janitor: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'janitor'}});        
    }
    
    else if(distanceHarvesters.length < 1) {
        var newName = 'Distance_Harvester' + Game.time;
        console.log('Spawning new Distance Harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'distanceHarvester'}});        
    }
    
    else if(transporters.length < 1) {
        var newName = 'Transporter' + Game.time;
        console.log('Spawning new transporter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName, 
            {memory: {role: 'transporter'}});        
    }
    
        
    else if(reservers.length < 1) {
        var newName = 'Reserver' + Game.time;
        console.log('Spawning new reserver: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName, 
            {memory: {role: 'reserver'}});        
    }
    
    else if(distanceBuilders.length < 1) {
        var newName = 'Distance_Builder' + Game.time;
        console.log('Spawning new Distance Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'distanceBuilder'}});        
    }
    
    //outpost1 ID
    var sourceIDOP1 = '5bbcaeea9099fc012e639c46';
    var containerIDOP1 = '62c2a38aa87fbb6b826d4e15';
    var storageIDMain = '62bee48f184dec307e527ca5';
    var sourceIDOP2 = '5bbcaedb9099fc012e639a8c';

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, storageIDMain);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'janitor') {
            roleJanitor.run(creep, storageIDMain);
        }
        else if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        }
        else if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep, containerIDOP1, storageIDMain);
        }
        else if(creep.memory.role == 'distanceHarvester') {
            roleDistanceHarvester.run(creep, containerIDOP1, sourceIDOP1);
        }
        else if(creep.memory.role == 'distanceBuilder') {
            roleDistanceBuilder.run(creep);
        }
    }
    
    var spawn1Towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER
        }
    })
    
    for (var name in spawn1Towers){
        var tower = spawn1Towers[name];
        buildingTower.run(tower);
    }
}
