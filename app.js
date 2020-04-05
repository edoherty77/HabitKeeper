var methodOverride = require("method-override"),
	SelectedHabit  = require("./models/selectedHabit"),
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
app.use(bodyParser.json())
app.use(methodOverride("_method"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
			res.redirect("/home/habits/" + req.user.id)
		})
	})
})


//LOGIN PAGE
app.get("/", function(req, res){
	res.render("login")
})

//HANDLING LOGIN LOGIC
app.post("/", 
	passport.authenticate("local"),
	function(req, res){
		res.redirect("/home/habits/" + req.user.id);	
})

//LOGOUT LOGIC
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/")
})


//LIST OF HABITS PAGE
app.get("/home/habits/:user_id", isLoggedIn, function(req, res){
	User.findById(req.params.user_id).populate("habits").exec(function(err, user){
		if(err){
			console.log(err)
		} else {
			
			res.render("habits", {user : user})
		}
	})
	
})

//ADD A NEW HABIT
app.post("/home/habits/:user_id", function(req, res){
	Habit.create({habit: req.body.habit} , function(err, newlyCreated){
		if(err){
			console.log(err)
		} else {
			(req.user.habits).push(newlyCreated)
			req.user.save(function(err, data){
				if(err){
					console.log(err)
				} else {
					// console.log("user saved")
				}
			})
			
			res.redirect("/home/habits/" + req.user.id)
		}
	})
})

//CALANDER PAGE
app.get("/home/:user_id", isLoggedIn, function(req, res){
	User.findById(req.params.user_id).populate("habits").exec(function(err, user){
		if(err){
			console.log(err)
		} else {
			
			
			res.render("home", {user : user})
		}
	})
})


app.delete("/home/habits/:habit_id", function(req, res){
	Habit.findByIdAndRemove(req.params.habit_id, function(err){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/home/habits/" + req.user.id)
		}
	})
})


app.post("/home/:user_id", function(req, res){
	var habits = req.body;
	for(habit in habits){
		SelectedHabit.create({selected: habit}, function(err, habitChecked){
			if(err){
				console.log(err)
			} else {
				(req.user.selected).push(habitChecked)
				req.user.save(function(err, data){
					if(err){
						console.log(err)
					} else {
						// console.log("good job")
					}
				})
			}
		})	
	}
	
	res.redirect("/home/results/" + req.user.id)
})




app.get("/home/results/:user_id", isLoggedIn, function(req, res){
	User.findById(req.params.user_id).populate("selected").exec(function(err, user){
		if(err){
			console.log(err)
		} else {
			
			res.render("results", {user: user})
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