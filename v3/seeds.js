var mongoose = require('mongoose');
var Campground = require('./models/campground');

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!!!");
    });
    //Add campgrounds
}

module.exports = seedDB;