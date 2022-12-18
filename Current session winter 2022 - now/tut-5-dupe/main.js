var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolePump = require('role.pump');
var roleTransporter = require('role.transporter');
var roleClaimer = require('role.claimer');
var roleExpansionBuilder = require('role.expansionbuilder');
var roomSpawn2 = require('room.spawn2');

module.exports.loop = function () {
    if(Game.spawns['Spawn2']){
        roomSpawn2.run();
    }
    for(var name in Memory.creeps) {
        console.log(name)
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var tower = Game.getObjectById('639b04a96d4437ec878a3793');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        else if(closestDamagedStructure && tower.store.getUsedCapacity(RESOURCE_ENERGY) > tower.store.getCapacity(RESOURCE_ENERGY)/4) {
            tower.repair(closestDamagedStructure);
        }
    }
    
    var allCreeps = Game.creeps;
    
    var harvesters = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(allCreeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(allCreeps, (creep) => creep.memory.role == 'builder');
    var pumps = _.filter(allCreeps, (creep) => creep.memory.role == 'pump');
    var transporters = _.filter(allCreeps, (creep) => creep.memory.role == 'transporter');
    var claimers = _.filter(allCreeps, (creep) => creep.memory.role == 'claimer');
    var expansionbuilders = _.filter(allCreeps, (creep) => creep.memory.role == 'expansionbuilder');
    
    
    if(pumps.length < 2){
        if(!Game.creeps["Pump1_0"]){
            var newName = 'Pump1_0';
        }
        else{
            var newName = 'Pump1_1';
        }
            
        console.log('Spawning new pump: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'pump'}});
    }
    else if(transporters.length < 1){
        if(!Game.creeps["Transporter0"]){
            var newName = 'Transporter0';
        }
        // else{
        //     var newName = 'Transporter1';
        // }
        console.log('Spawning new transporter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'transporter'}});
    }
    
    else if(upgraders.length < 4) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    else if(claimers.length < 1 && !Game.spawns["Spawn2"]){
        var newName = 'Claimer' + Game.time;
        console.log('Spawning new claimer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'claimer'}});
    }
    
    else if(expansionbuilders.length < 0){
        var newName = 'Exansion_Builder' + Game.time;
        console.log('Spawning new expansion builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'expansionbuilder'}});
    }
    else if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, "639a785883d1146dbcfbc72e");
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, "639a67dc7ae10847a42ddd63");
        }
        else if(creep.memory.role == 'pump') {
            rolePump.run(creep, 0);
        }
        else if(creep.memory.role == 'transporter'){
            roleTransporter.run(creep)
        }
        else if(creep.memory.role == 'claimer'){
            roleClaimer.run(creep)
        }
        else if(creep.memory.role == 'expansionbuilder'){
            roleExpansionBuilder.run(creep)
        }
    }
}