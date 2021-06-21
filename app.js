const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true})); // to log form data

app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var fname = req.body.fName;
    var lname = req.body.lName;
    var email = req.body.email;
    console.log(fname, lname, email); // use body-parser
})

app.listen(3000, function(req, res){
    console.log("Server has satarted on port 3000");
})

/*

res.sendFile(__dirname + "/signup.html"); 
=> To display our html file in the localhost:3000

app.use(express.static("public"))   == For css 
we are to create a folder called public where we are going to keep all our extra files like css and images 

=> Also kindly look into the href in signup.html for relative path change
*/