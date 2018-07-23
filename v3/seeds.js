var mongoose = require('mongoose');
var Campground = require('./models/campground');

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!!!");
    });
}

module.exports = seedDB;