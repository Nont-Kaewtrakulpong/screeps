/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('building.link');
 * mod.thing == 'a thing'; // true
 */

var buildingLink = {
    /** @param {Tower} tower **/
    run: function(linkFrom, linkTo) {
        if(linkFrom.store[RESOURCE_ENERGY] > 750){
            linkFrom.transferEnergy(LinkTo);
        }
    }
    
}

module.exports = buildingLink;