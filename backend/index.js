const express= require("express");
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");
const multer  = require('multer')
const bodyparser= require("body-parser");
const cors= require("cors");
const path= require("path");
const session= require("express-session");
const passport= require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const transporter= require("./middleware/transporter");

require("dotenv").config();

const {Food, FoodUser, FoodAdmin}= require("./db/index");
const {checkAllreadyExist, validateJWT}= require("./middleware/auth");

mongoose
.connect(
  "mongodb+srv://vasudevgarg7:vasudevgarg7@cluster0.ucwxkxw.mongodb.net/"
)
.then(() => {
  console.log("connected");
})
.catch(() => {
  console.log("error");
});

const app= express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(
    cors({
      origin: "*", // use your actual domain name (or localhost), using * is not recommended
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Accept",
        "x-client-key",
        "x-client-token",
        "x-client-secret",
        "Authorization",
        "token",
      ],
      credentials: true,
    })
  );
  
  app.use(bodyparser.json());
  app.use("/image", express.static("uploads")); 

  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

  app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5002/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          userProfile=profile;
          return done(null, userProfile);
      }
    ));


let imgName="";
var userProfile;
const storage= multer.diskStorage({
    destination: path.join("./uploads"),
    filename: (req, file, cb)=>{
        imgName= Date.now()+ path.extname(file.originalname);
        cb(null, imgName);
    }
})

// const upload = multer({ dest: 'uploads/' });

const upload= multer({
    storage: storage,
    limits:{fileSize:30000000}

});

app.post("/admin/postimage", (req, res)=>{
   

upload(req, res, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("http://localhost:5002/image/"+imgName);
        return res.json({url: "http://localhost:5002/image/"+imgName});
    }
})
});

app.post("/admin/uploadcard",upload.single("url"), async (req, res)=>{
    const title= req.body.title;
    const description= req.body.description;
    const price= req.body.price;
    const catagory= req.body.catagory;

// console.log(req.body);

    const checkCatagory=await Food.findOne({catagory: catagory});
try{
    if(checkCatagory== null){
        const newItem= new Food({
            catagory: catagory,
            items:[{"title": title, "description": description, "price": price, url: imgName}]
        });
await newItem.save();

    }else{
        const item= await Food.findOne({catagory:catagory});
        console.log(item);
       await Food.findOneAndUpdate({catagory: catagory}, {items:[...item.items, {"title": title, "description": description, "price": price, url: imgName}]}, {upsert:true});
       
    }

    res.send({"message":"card uploaded"});
}catch{
    res.send("error occured");
}
})


app.post("/login", async(req, res)=>{
    const {username, password}= req.body;
    let user=await FoodUser.findOne({username: req.body.username});

    if(user){
        if(user.password== req.body.password){
            res.status(201).send({"message":"login successful"});
        }else{
            res.status(401).json({"message":"invalid Password"});
        }
    }else{
        res.status(401).json({"message":"user doesnt exist"});
    }
    
});

// app.post("/signup",checkAllreadyExist, async (req, res)=>{

//     const user= new FoodUser({"username": req.body.username, "password": req.body.password});
//     const token=jwt.sign( {username:req.body.username},process.env.jwttoken);
//     user.token= token;

//     user.save();
//     res.status(201).json({"message":"signup successful", "token": token});
// })

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

app.get('/success', (req, res) =>{console.log("success"); res.send(userProfile); });
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  app.get("/user/menu", async(req, res)=>{
    const allItems=await Food.find({});
    res.status(201).send({"items":allItems});
  });



  app.post("/user/signup", async (req, res)=>{
    const uniqueNum= Math.trunc(Math.random()*10000);
    console.log(process.env.jwttoken);
    const token=jwt.sign( {username:req.body.username},process.env.jwttoken);
    const user= new FoodUser({
        "username": req.body.username,
        "password": req.body.password,
        "uniqueNum": uniqueNum,
        "prevOrders":[],
        "currOrder":[],
        "token":token
    });
    await user.save();

    transporter.sendMail({
        from: 'vasudevgarg7@gmail.com',
        to: req.body.username,
        subject: 'This is verification mail for Food Delivery Website.',
       html: '<a href:"http:localhost:5002/user/verify/'+uniqueNum+'">Press Here</a>'
      }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({"message": "Mail sent. Waiting for conformation"});
        }
      });
  });

app.get("/user/verify/:uniqueNum", async (req, res)=>{
    const num= req.params.uniqueNum;

    const user= await FoodUser.find({"uniqueNum":num});

    if(user){
        res.json({"message":"signUp successful", "token":user.token});
    }else{
        res.status(401).send({"message":"verification failed"});
    }
});

app.get("/user/addtocart/:id", async (req, res)=>{
  const id= req.params.id;
  try{
      const user=await Food.findOne({"token": req.headers.token});
await FoodUser.findOneAndUpdate({"token": req.headers.token}, {"currOrder":[...user.currOrder,{"product_id": id, "count":1}]});
res.status(201).send({"message":"cart updated"});
  }catch{
      res.status(401).send({"message":"error occured"});
  }
});

app.listen(5002, ()=>console.log("listening to 5002"));