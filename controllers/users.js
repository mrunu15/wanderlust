const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signup = async (req, res) => {
    try{let {username, email, password} = req.body;
    const newUser=new User({username, email});
    const registeredUser=await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","User registered successfully");
        res.redirect("/listings");
    });
    
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm = async (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success","Welcome to Wanderlust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl  || "/listings";
    // by default passport reset redirectUrl therefore prblm occurs when we 
    // res.redirect(req.session.redirectUrl);
    // therefore we need to access by locals bcoz locals are accessible everywhere and passport doesnt have access to locals we have do this with help of middleware
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
}