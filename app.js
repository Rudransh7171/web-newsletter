const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended :true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res)
{

  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var email=req.body.email;
  var data={
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url ="https://us20.api.mailchimp.com/3.0/lists/704d0fd37a";
  const options={
    method:"POST",
    auth: "Rudransh:586aa7a64b4434455e7f952e672627e3-us20"
  }
const request=  https.request(url,options,function(response)
{
  if(response.statusCode===200){
    res.sendFile(__dirname+"/suc.html");
  }
  else{
    res.sendFile(__dirname+"/fail.html");
  }
  response.on("data",function(data)
{
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();

  console.log(firstName,lastName,email);
});
app.post("/failure",function(req,res)
{
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function()
{
  console.log("server is running on port 3000");
});
//586aa7a64b4434455e7f952e672627e3-us20
//704d0fd37a
