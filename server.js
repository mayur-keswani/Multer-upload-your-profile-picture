const express=require('express')
const multer=require('multer')
const ejs=require('ejs');

const app=express();
const path=require('path');

const hostname='127.0.0.1';
const port= process.env.PORT || 3001;

app.use(express.static("./public")); //just telling the exppress that all static files are in /public directory
app.set('view engine','ejs');

var storage = multer.diskStorage({                                   //There are two options available, destination and filename.
    destination: function (req, file, cb) {              //destination is used to determine within which folder the uploaded files should be stored.
      cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {                            //filename is used to determine what the file should be named inside the folder. 
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })
   
  var upload = multer({ storage: storage }).single('profilepic');   //Accept a single file with the name fieldname. The single file will be stored in req.file.
app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/upload', (req,res)=>{
    upload(req,res,(error)=>{
          if(error)
            {
                 res.render('index',{message:'not supported'});
            }
          else
            {
              res.render('index',{
                                   message:"profile_pic has been uploaded successfully", 
                                   filename:`myupload/${req.file.filename}`
                                });
            }   
    })
})

app.listen(port,hostname,()=>{
    console.log(`You are Live on ${hostname}:${port}`);
  });