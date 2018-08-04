app.get("/", function(req,res){
    res.render("landing");
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
