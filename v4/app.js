// ===========================
//  SETUP
// ===========================
var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    seedDB     = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v4', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

//SEED FILE
seedDB();

// ===========================
//  CAMPGROUND'S ROUTES
// ===========================

app.get("/",function(req,res){
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("index",{campgrounds:allCampgrounds}); 
        }
    });
});

//NEW
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

//CREATE
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Something went wrong");
        } else {
            console.log(foundCampground);
            res.render("show",{campground: foundCampground});
        }
    });
});

// ===========================
//  COMMENTS' ROUTES
// ===========================

//NEW
app.get("/campgrounds/:id/comments/new",function(req,res){
    res.send("Hello, /comments/new !");
});

// ===========================
//  SERVER CONFIG
// ===========================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});

