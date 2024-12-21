const express= require("express");
const router = express.Router();

// index route
router.get("/user",(req,res)=>{
    res.send("GET for show users");
})

// show route
router.get("/user/:id",(req,res)=>{
    res.send("GET for show user");
})

// post user
router.post("/user",(req,res)=>{
    res.send("POST for show users");
})

// de;eye
router.delete("/user/:id",(req,res)=>{
    res.send("DELETE for show users");
})

module.exports = router;