const express= require("express");
const router = express.Router();

// index route
router.get("/post",(req,res)=>{
    res.send("GET for show users");
})

//  show user
router.post("/post/:id",(req,res)=>{
    res.send("POST for show users");
})

// post route
router.post("/post",(req,res)=>{
    res.send("POST for show users");
})

// de;eye
router.delete("/post",(req,res)=>{
    res.send("DELETE for show users");
})

module.exports=router;