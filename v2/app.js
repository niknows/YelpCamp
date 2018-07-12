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
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema) ;

// var newCampground = new Campground({
    
//   name: "Vast Paradise Canyon",
//   image: "https://farm6.staticflickr.com/5608/15344614880_60b9be5b4f.jpg"
   
// });

// newCampground.save(function(err,campground){
//     if(err){
//         console.log("Something went wrong");
//     } else{
//         console.log("Success!!");
//         console.log(campground);
//     }
// });

/*ROUTES*/
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("campgrounds",{campgrounds:allCampgrounds}); 
        }
    });
   
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});

