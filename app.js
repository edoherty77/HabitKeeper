var methodOverride = require("method-override"),
	LocalStrategy  = require("passport-local"),
	bodyParser     = require("body-parser"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
	express        = require("express"),
	Habit          = require("./models/habit"),
	User           = require("./models/user"),
	app            = express()
	


mongoose.connect("mongodb://localhost/habit_keeper", { useNewUrlParser: true })
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("view options", { layout: false } );
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));


//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//===============================
//AUTH ROUTES
//===============================

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});



//REGISTER PAGE
app.get("/register", function(req, res){
	res.render("register")
})

//HANDLE SIGN UP LOGIC
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/home/habits")
		})
	})
})


//LOGIN PAGE
app.get("/", function(req, res){
	res.render("login")
})

//HANDLING LOGIN LOGIC
app.post("/", passport.authenticate("local",
	{
	successRedirect: "/home/habits",
	failureRedirect: "/"
	}), function(req, res){
})

//LOGOUT LOGIC
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/")
})


//CALANDER PAGE
app.get("/home", isLoggedIn, function(req, res){	
	Habit.find({}, function(err, allHabits){
		if(err){
			console.log("somethins fucked")
		} else{
			res.render("home", { habits: allHabits })
		}
	})
})





//LIST OF HABITS PAGE
app.get("/home/habits", isLoggedIn, function(req, res){
	Habit.find({}, function(err, allHabits){
		if(err){
			console.log("somethins fucked")
		} else{
			res.render("habits", { habits: allHabits })
		}
	})
})

//ADD A NEW HABIT
app.post("/home/habits", function(req, res){
	Habit.create({habit: req.body.habit} , function(err, newlyCreated){
		if(err){
			console.log(err)
		} else {
			(req.user.habits).push(newlyCreated)
			req.user.save(function(err, data){
				if(err){
					console.log(err)
				} else {
					console.log(data)
				}
			})
			
			res.redirect("/home/habits")
		}
	})
})



app.delete("/home/habits/:habit_id", function(req, res){
	Habit.findByIdAndRemove(req.params.habit_id, function(err){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/home/habits")
		}
	})
	
})



function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/")
}



app.listen(3000, function(){
	console.log("The YelpCamp server has started")
})