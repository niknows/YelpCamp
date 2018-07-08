/*BASIC SETUP*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

  var campgrounds = [
        {name: "Tear's Peak", image: "https://pixabay.com/get/e835b20e2bf2013ed1584d05fb1d4e97e07ee3d21cac104496f1c17daeecbdbd_340.jpg"},
        {name: "Vast Paradise Canyon", image: "https://farm6.staticflickr.com/5608/15344614880_60b9be5b4f.jpg"},
        {name: "Dwarf's Mountain", image: "https://farm1.staticflickr.com/304/18837745840_a5565e4537.jpg"}
        ];
        
/*ROUTES*/
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
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

