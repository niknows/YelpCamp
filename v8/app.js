// ===========================
//  SETUP
// ===========================
var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    passport         = require('passport'),
    LocalStrategy    = require('passport-local'),
    Campground       = require('./models/campground'),
    Comment          = require('./models/comment'),
    User             = require('./models/user'),
    seedDB           = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v8', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

//SEED FILE // seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "A secret is a secret",
    resave: false,
    saveUninitialized: false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//currentUser available to all routes
app.use(function(req,res,next){
   res.locals.currentUser = req.user; 
   next();
});


// ===========================
//  CAMPGROUND'S ROUTES
// ===========================

app.get("/", function(req,res){
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds}); 
        }
    });
});

//NEW
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
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
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Something went wrong");
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

// ===========================
//  COMMENTS' ROUTES
// ===========================

//NEW
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: foundCampground});
        }
    });
    
});

//CREATE
app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err,comment){
               if(err){
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
    }
    );
});


// ===========================
//  AUTH ROUTES
// ===========================

//register form
app.get("/register", function(req,res){
   res.render("register"); 
});
//register form logic
app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register"); //short-circuit
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login form
app.get("/login", function(req,res){
    res.render("login");
});
//login logic
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
});

//logout logic
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// ===========================
//  SERVER CONFIG
// ===========================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});

