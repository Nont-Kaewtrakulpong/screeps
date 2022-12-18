/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.spawn2');
 * mod.thing == 'a thing'; // true
 */

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.spawn2');
 * mod.thing == 'a thing'; // true
 */
 
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleJanitor = require('role.janitor');
var roleBuilder = require('role.builder');
var rolePump = require('role.pump');
var roleTransporter = require('role.transporter');

var roomSpawn2 = {
    run: function() {
        
        var allCreeps = Game.creeps;
        
        var upgraders = _.filter(allCreeps, (creep) => creep.memory.role == 'upgraderSpawn2');
        var harvesters = _.filter(allCreeps, (creep) => creep.memory.role == 'harvesterSpawn2');
        var builders = _.filter(allCreeps, (creep) => creep.memory.role == 'builderSpawn2');
        var janitors = _.filter(allCreeps, (creep) => creep.memory.role == 'janitorSpawn2');
        var pumps = _.filter(allCreeps, (creep) => creep.memory.role == 'pumpSpawn2');
        var transporters = _.filter(allCreeps, (creep) => creep.memory.role == 'transporterSpawn2');
        var tower = Game.getObjectById('639e5715e02dfd827a1d999d');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
        
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            else if(closestDamagedStructure && tower.store.getUsedCapacity(RESOURCE_ENERGY) > tower.store.getCapacity(RESOURCE_ENERGY)/4) {
                tower.repair(closestDamagedStructure);
            }
        }
        
        // console.log('Upgraders Spawn2: ' + upgraders.length);
        // console.log('Harvesters Spawn2: ' + harvesters.length);
        // console.log('Builders Spawn2: ' + builders.length);
        // console.log('Janitors Spawn2: ' + janitors.length);\

        if(pumps.length < 2){

            if(!Game.creeps["Pump2_0"]){
                var newName = 'Pump2_0';
            }
            else{
                var newName = 'Pump2_1';
            }
            
            console.log('Spawning new pump: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'pumpSpawn2'}});
        }
        
        else if(transporters.length < 2) {
            
            if(!Game.creeps["Transporter2_0"]){
                var newName = 'Transporter2_0';
            }
            else{
                var newName = 'Transporter2_1';
            }
            console.log('Spawning new transporter: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'transporterSpawn2'}});        
        }
        
        else if(harvesters.length < 0) {
            var newName = 'Harvester_2' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'harvesterSpawn2'}});        
        }
        
        else if(upgraders.length < 2) {
            var newName = 'Upgrader_2' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'upgraderSpawn2'}});        
        }
        
        else if(janitors.length < 0) {
            var newName = 'Janitor_2' + Game.time;
            console.log('Spawning new janitor: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'janitorSpawn2'}});        
        }
        else if(builders.length < 3) {
            var newName = 'Builder_2' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'builderSpawn2'}}); 
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvesterSpawn2') {
                roleHarvester.run(creep);
            }
            else if(creep.memory.role == 'upgraderSpawn2') {
                roleUpgrader.run(creep, "639e4dfd7d7967c4667c49bb");
            }
            else if(creep.memory.role == 'janitorSpawn2') {
                roleJanitor.run(creep);
            }
            else if(creep.memory.role == 'builderSpawn2') {
                roleBuilder.run(creep, "639e420b93613638ec9b9afa");;
            }
            else if(creep.memory.role == 'pumpSpawn2') {
                rolePump.run(creep);
            }
            else if(creep.memory.role == 'transporterSpawn2') {
                roleTransporter.run(creep);
            }
        }
    }
}
module.exports = roomSpawn2;