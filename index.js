var express = require("express");
var mongoose = require('mongoose'); 
// This is use for file upload
var multer = require("multer");
var app = express();


//Define Port
const port = 3000;

//DB Connection

mongoose.connection.openUri('mongodb://localhost:27017/imageuploadeddb',{useNewUrlParser:true});
mongoose.connection.on('connected',() => {
   console.log("connected to db")
})
mongoose.connection.on('error',(err)=>{
   if(err){
       console.log(`Conenction failed ${err}`)
   }
})


// Import Photo Schema
var schemaPhot = require('./models/ImageUploadModel');

//Storage 
var storage = multer.diskStorage({
   destination: function(req,file,callback){
       callback(null,'./upload');
   },
   filename: function(req,file,callback){
       callback(null,file.fieldname+'-'+Date.now()+".jpg")
   }
   
})

//File upload
//For single image upload use single('UserPhoto')
//For multiple images upload use .array('userPhot,100')
// 100 is limit of uploading and if you remove then it's mean you can upload unlimited 
//First parameter is image name and second parameter is upload multiple images
var upload = multer({'storage':storage}).array('userPhoto');

 
//Get Request
app.get('/',function(req,res){
   res.sendFile(__dirname+"/index.html");
   
})


// Post Request
app.post('/api/photo',function(req,res){

   upload (req,res, function (err, result) {

   if(err) {
       return res.end("Error uploading file");
   }
   else {
        res.send("File Uploaded");
        console.log(req.file)
        var starting = 0;
        if ( starting < req.files.length) {
            req.files.forEach (Element => {
                let addPhoto = new schemaPhot();
                addPhoto.phot_name =Element.filename;
                addPhoto.phot_path = Element.path;
                addPhoto.save();
                // console.log( Element.filename)
            })

            starting++;
        }
        else {
            res.send("Error no file uploaded")
        }
    }
 
   })
})

  
app.listen(port,function(){
   console.log(`App is listen at port ${port}`);
})