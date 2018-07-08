/*BASIC SETUP*/
var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

/*ROUTES*/
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds", function(req,res){
    var campgrounds = [
        {name: "Tear's Peak", img: "https://pixabay.com/get/e835b20e2bf2013ed1584d05fb1d4e97e07ee3d21cac104496f1c17daeecbdbd_340.jpg"},
        {name: "Vast Paradise Canyon", img: "https://farm6.staticflickr.com/5608/15344614880_60b9be5b4f.jpg"},
        {name: "Dwarf's Mountain", img: "https://farm1.staticflickr.com/304/18837745840_a5565e4537.jpg"}
        ];
        
    res.render("campgrounds",{campgrounds:campgrounds});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});

