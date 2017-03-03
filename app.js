var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    User           = require("./models/user"),
    flash          = require("connect-flash"),
    Campground     = require("./models/campground"),
    methodOverride = require("method-override"),
    seedDB         = require("./seeds"),
    Comment        = require("./models/comment"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local")
    
// Requiring Routes    
var commentRoutes    = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes      = require("./routes/index")

mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://kris:307608kH@ds113660.mlab.com:13660/yelpcamp123")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// ===============================================
//            PASSPORT CONFIGURATION
// ===============================================

app.use(require("express-session")({
    secret: "Kujo is the cutest dog in the whole world!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ===============================================
//            ROUTES
// ===============================================

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// ===============================================
//            SERVER CONNECTION
// ===============================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started");
})