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

var roomSpawn2 = {
    run: function() {
        
        var allCreeps = Game.creeps;
        
        var upgraders = _.filter(allCreeps, (creep) => creep.memory.role == 'upgraderSpawn2');
        var harvesters = _.filter(allCreeps, (creep) => creep.memory.role == 'harvesterSpawn2');
        var builders = _.filter(allCreeps, (creep) => creep.memory.role == 'builderSpawn2');
        var janitors = _.filter(allCreeps, (creep) => creep.memory.role == 'janitorSpawn2');
        
        console.log('Upgraders Spawn2: ' + upgraders.length);
        console.log('Harvesters Spawn2: ' + harvesters.length);
        console.log('Builders Spawn2: ' + builders.length);
        console.log('Janitors Spawn2: ' + janitors.length);
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        if(harvesters.length < 1) {
            var newName = 'Harvester_2' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'harvesterSpawn2'}});        
        }
        
        else if(upgraders.length < 1) {
            var newName = 'Upgrader_2' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'upgraderSpawn2'}});        
        }
        
        else if(janitors.length < 0) {
            var newName = 'Janitor_2' + Game.time;
            console.log('Spawning new janitor: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], newName, 
                {memory: {role: 'janitorSpawn2'}});        
        }
        else if(builders.length < 0) {
            var newName = 'Builder_2' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'builderSpawn2'}}); 
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvesterSpawn2') {
                roleHarvester.run(creep, 'Spawn2');
            }
            else if(creep.memory.role == 'upgraderSpawn2') {
                roleUpgrader.run(creep);
            }
            else if(creep.memory.role == 'janitorSpawn2') {
                roleJanitor.run(creep);
            }
            else if(creep.memory.role == 'builderSpawn2') {
                roleBuilder.run(creep);
            }
        }
    }
}
module.exports = roomSpawn2;