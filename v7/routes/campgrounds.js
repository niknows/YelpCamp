var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");



// ===========================
//  CAMPGROUND'S ROUTES
// ===========================
//INDEX
router.get("/", function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds}); 
        }
    });
});

//NEW
router.get("/new", function(req,res){
    res.render("campgrounds/new");
});

//CREATE
router.post("/", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var info = req.body.info;
    //Create a new campground and add it to the database
    var newCampground = new Campground({
        name: name,
        image: image,
        description: info
    });
    newCampground.save(function(err,campground){
       if(err){
           console.log("Something went wrong");
       } else{
        res.redirect("/campgrounds");
       } 
    });
});

//SHOW
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Something went wrong");
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

module.exports = router;