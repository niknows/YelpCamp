/*BASIC SETUP*/
var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

 var Campground = mongoose.model("Campground", campgroundSchema) ;

/*ROUTES*/
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("index",{campgrounds:allCampgrounds}); 
        }
    });
   
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    //Create a new campground and add it to the database
    var newCampground = new Campground({
        name: name,
        image: image
    });
    newCampground.save(function(err,campground){
       if(err){
           console.log("Something went wrong");
       } else{
        res.redirect("/campgrounds");
       } 
    });
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log("Something went wrong");
        } else {
            res.render("show",{campground: foundCampground});
        }
    });
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});

