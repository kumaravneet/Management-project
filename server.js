var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var http = require("http");
var url = require("url");

var fs = require('fs');
var pdf = require('html-pdf');


   var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
  })



var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/management';


app.use(bodyParser());


app.use("/", express.static(__dirname));

app.post('/registerUser', function (req, res) {
      
          var user  = {name: req.body.firstname+" "+req.body.lastname, email:req.body.email, pwd:req.body.passwd,userData:[]};
  
          MongoClient.connect(url, function (err, db) {
              if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
              } else {
              
                console.log('Connection established to', url);
                        var collection = db.collection('users');

                         collection.find({email: req.body.email}).toArray(function (err, result) {
                        if (err) {
                          console.log(err);
                        } else if (result.length) {

                          res.status("200");
                          console.log("User already registred with system"); 
                          var status = {"data":[{"status":"User already registred with system "}]}
                          res.end(JSON.stringify(status));
                          db.close();

                        } else {
                          //console.log('No document(s) found with defined "find" criteria!');


                                  collection.insert([user], function (err, result) {
                                    if (err) {
                                      console.log("we have error here"+err);
                                    } else {
                                       res.status("200");
                                       var status = {"data":[{"status":"User added with the system"}]}
                                       res.end(JSON.stringify(status));
                                       db.close();
                                    }
                               });

                        }
                        

                   });

              }
        });
})


app.post('/login', function (req, res) {
         
            MongoClient.connect(url, function (err, db) {
              if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
              } else {
              
                console.log('Connection established to', url);

                var collection = db.collection('users');
               
             
                collection.find({email: req.body.email, pwd:req.body.passwd}).toArray(function (err, result) {
                if (err) {
                  console.log(err);
                } else if (result.length) {
                  //console.log('Found:', result);
                   var responseData =  {"data":[{"status":"1"},{"userInfo":result}]}

                   res.status("200");
                   //var status = {"data":[{"Login successfull"}]}
                   res.end(JSON.stringify(responseData));
                } else {
                    res.status("200");
                    var status = {"data":[{"status":"0"},{"userInfo":[]}]}
                    res.end(JSON.stringify(status));
                }
                db.close();

              });



              }
        });
              
})


         app.post('/savePdf', function (req, respo) {
          var mongodb = require('mongodb');
          var MongoClient = mongodb.MongoClient;
          var url = 'mongodb://localhost:27017/mydatabase';
                
                var email  = req.body.email;
                var htmldata  = req.body.htmlData;
               var options = { format: 'Letter' };
               var timeStamp = new Date().getTime()
            
                pdf.create(htmldata, options).toFile('./'+email+timeStamp+'.pdf', function(err, res) {
                 if (err) return console.log(err);
               
                 
                 var pdfName = "http://localhost:8081/"+email+timeStamp+".pdf";
                 var statusData = {"data":[{"url":pdfName}]}
                 respo.status("200");
                 respo.end(JSON.stringify(statusData)); // { filename: '/app/businesscard.pdf' } 
              });

                
       })




      app.post('/forgotPassword', function (req, respo) {
           
                MongoClient.connect(url, function (err, db) {
              if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
              } else {
                console.log('Connection established to', url);
                var collection = db.collection('users');
                collection.find({email: req.body.email}).toArray(function (err, result) {
                if (err) {
                  console.log(err);
                } else if (result.length) {
                     collection.update(
                       
                       {email: req.body.email }, {$set:{pwd: "welcome1234"}}, function(){

                                            console.log("update");  
                                            respo.status("200");
                                            var responseData = {"data":[{"status":"0"},{"respnse":"passwd reset to welcome1234"}]}
                                            respo.end(JSON.stringify(responseData));
                        }






                      )
                 } else {
                     console.log("not found");  
                    respo.status("200");
                    var responseData = {"data":[{"status":"0"},{"respnse":"No user found related to this email id"}]}
                    respo.end(JSON.stringify(responseData));
                }
                db.close();
                
                 });
            }
        });

               
                
       })















