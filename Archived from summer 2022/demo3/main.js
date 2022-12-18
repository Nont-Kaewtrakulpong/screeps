
var roomSpawn1 = require('room.spawn1');
var roomSpawn2 = require('room.spawn2');

module.exports.loop = function () {
    roomSpawn1.run();
    roomSpawn2.run();
}
