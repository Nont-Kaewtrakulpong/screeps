var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolePump = require('role.pump');
var roleTransporter = require('role.transporter');

module.exports.loop = function () {
    
    console.log(Game.creeps["Pump2"])
    
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
    var transporters = _.filter(allCreeps, (creep) => creep.memory.role == 'transporter');
    
    if(harvesters.length < 0) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    else if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    else if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    else if(pumps.length < 2){
        if(!Game.creeps["Pump0"]){
            var newName = 'Pump0';
        }
        else{
            var newName = 'Pump1';
        }
            
        console.log('Spawning new pump: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'pump'}});
    }
    else if(transporters.length < 1){
        if(!Game.creeps["Transporter0"]){
            var newName = 'Transporter0';
        }
        else{
            var newName = 'Transporter1';
        }
        console.log('Spawning new transporter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'transporter'}});
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
    }
}