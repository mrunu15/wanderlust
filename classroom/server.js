const express= require("express");
const app = express();
const users = require("./routes/user.js")
const post= require("./routes/post.js")
// const cookieParser = require("cookie-parser");
const session = require('express-session');
const flash = require("connect-flash");
const path = require("path");
const ejsMate = require('ejs-mate');


app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions ={
    secret:"mysupersecretstring",resave:false,saveUninitialized:true
}

app.use(session(sessionOptions));
// app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name ="anoymous"} = req.query;
    // console.log(req.session);
    req.session.name = name;
    console.log(req.session.name)
    if(name==="anonymous"){
        req.flash(`error`,`user is not registered`);
    }else{
        req.flash(`success`,`user is registered`)
    }
    
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    // res.send(`hello, ${req.session.name}`);
    // console.log(req.flash("info"))
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page.ejs",{name: req.session.name});
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count=1;
//     }
//     // req.session.count = 1;
//     res.send(`You sent a request ${req.session.count} times`)
// })

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// })

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req, res)=>{
//     res.cookie("made-In","India",{signed: true});
//     res.send("signed cookie sent");
// })

// app.get("/verify",(req,res)=>{
//     // console.log(req.cookies);
//     console.log(req.signedCookies);

//     res.send("verified");
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("madeIn","English");
//     res.send("sent you cookies!");
// })

// app.get("/greet",(req,res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// })
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi, I m root");
// })

// app.use("/user", users);
// app.use("/post", post);

app.listen(3000,()=>{
    console.log("server is listening to 3000")
})