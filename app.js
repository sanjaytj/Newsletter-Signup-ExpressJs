const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended: true})); // to log form data

app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName; // using body-parser
    const email = req.body.email; // its not to be changed..turn to const
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_feilds: { // mailchimp..Audiences..Settings..'[MERGE]' tags 
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }; 

    var jsonData = JSON.stringify(data); //converts JSON data to string

    const url = "https://us6.api.mailchimp.com/export/1.0/list/fa5cbb5f66";

    const options = {
        method: "POST",
        auth: "sanjay:2d5115c1897e85627f536d19c346bba2-us6"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(req, res){
    console.log("Server has satarted on port 3000");
})

/*

res.sendFile(__dirname + "/signup.html"); 
=> To display our html file in the localhost:3000

app.use(express.static("public"))   == For css 
we are to create a folder called public where we are going to keep all our extra files like css and images 

=> Also kindly look into the href in signup.html for relative path change

Mailchimp API Key: 2d5115c1897e85627f536d19c346bba2-us6
Mailchimp List ID: fa5cbb5f66
----------------------------------------------------------------
JSON Data: ["Email Address","First Name","Last
Name","Birthday","MEMBER_RATING","OPTIN_TIME","OPTIN_IP","CONFIRM_TIME","CONFIRM_IP","LATITUDE","LONGITUDE","GMTOFF","DSTOFF","TIMEZONE","CC","REGION","LAST_CHANGED","LEID","EUID","NOTES"]
["gladys.mcvankab@example.com","Gladys","McVankab","",4,"2018-03-15 17:51:42",null,"2018-03-15
17:51:42","205.201.132.5",null,null,null,null,null,null,null,"2018-03-15 17:51:42",67042739,"77514fa407",null]
["cat@example.com","Kitty","Cat","",2,"2021-02-23 15:22:16",null,"2021-02-23
15:22:16","205.201.132.5",null,null,null,null,null,null,null,"2021-02-23 15:22:16",171106435,"52e230f061",null]
----------------------------------------------------------------
https.get(url, function()) .. makes only GET request when we want data from an external server

=> To make a POST request => nodejs.org/api/https.html .. https.request(options, callback)

=> https://nodejs.org/api/http.html#http_http_request_options_callback

=> this endpoint of list/audience export will give you contacts in a list/audience and all of their associated details.
=> https://us6.api.mailchimp.com/export/1.0/list/fa5cbb5f66
*/