const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = "3001";

app.use(cors());

//cors options

app.get("/api", (req, res)=>{
    console.log("hello")
})

app.get("/", (req, res)=>{
    res.send("" + Math.floor(Math.random()*100));
})

app.listen(PORT, ()=>{
    console.log("Listening on PORT 3001")
})