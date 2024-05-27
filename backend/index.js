const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const transporter = require("./middleware/transporter");

require("dotenv").config();

const { Food, FoodUser, FoodAdmin } = require("./db/index");
const { checkAllreadyExist, validateJWT } = require("./middleware/auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
  })
);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyparser.json());
app.use("/image", express.static("uploads"));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5002/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

let imgName = "";
var userProfile;
const storage = multer.diskStorage({
  destination: path.join("./uploads"),
  filename: (req, file, cb) => {
    imgName = Date.now() + path.extname(file.originalname);
    cb(null, imgName);
  },
});

// const upload = multer({ dest: 'uploads/' });

const upload = multer({
  storage: storage,
  limits: { fileSize: 30000000 },
});

app.post("/admin/postimage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("http://localhost:5002/image/" + imgName);
      return res.json({ url: "http://localhost:5002/image/" + imgName });
    }
  });
});

app.post("/admin/uploadcard", upload.single("url"), async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const catagory = req.body.catagory;

  // console.log(req.body);

  const checkCatagory = await Food.findOne({ catagory: catagory });
  try {
    if (checkCatagory == null) {
      const newItem = new Food({
        catagory: catagory,
        items: [
          {
            title: title,
            description: description,
            price: price,
            url: imgName,
          },
        ],
      });
      await newItem.save();
    } else {
      const item = await Food.findOne({ catagory: catagory });
      console.log(item);
      await Food.findOneAndUpdate(
        { catagory: catagory },
        {
          items: [
            ...item.items,
            {
              title: title,
              description: description,
              price: price,
              url: imgName,
            },
          ],
        },
        { upsert: true }
      );
    }

    res.send({ message: "card uploaded" });
  } catch {
    res.send("error occured");
  }
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await FoodUser.findOne({ username: username });

  if (user) {
    if (user.password == password) {
      res.status(201).send({ message: "login successful", token: user.token });
    } else {
      res.status(401).json({ message: "invalid Password" });
    }
  } else {
    res.status(401).json({ message: "user doesnt exist" });
  }
});

app.get(
  "/user/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);

app.get("/success", (req, res) => {
  console.log("success");
  res.send(userProfile);
});
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get("/user/menu", async (req, res) => {
  const allItems = await Food.find({});
  res.status(201).send({ items: allItems });
});

app.post("/user/signup", async (req, res) => {
  const uniqueNum = Math.trunc(Math.random() * 10000);
  console.log(process.env.jwttoken);
  const token = jwt.sign({ username: req.body.username }, process.env.jwttoken);
  const user = new FoodUser({
    username: req.body.username,
    password: req.body.password,
    uniqueNum: uniqueNum,
    prevOrders: [],
    currOrder: [],
    token: token,
  });
  await user.save();

  const verificationLink = `http://localhost:5002/user/verify/${uniqueNum}`;

  transporter.sendMail(
    {
      from: "vasudevgarg7@gmail.com",
      to: req.body.username,
      subject: "This is verification mail for Food Delivery Website.",
      html: `<a href="${verificationLink}">Press Here</a> or visit ${verificationLink}`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);

        res
          .status(201)
          .json({
            message: "Mail sent. Waiting for conformation",
            token: token,
          });
      }
    }
  );
});

app.get("/user/verify/:uniqueNum", async (req, res) => {
  const num = req.params.uniqueNum;

  const user = await FoodUser.findOne({ uniqueNum: num });

  if (user) {
    res.redirect("http://localhost:3000/");
    // res.json({"message":"signUp successful", "token":user.token});
  } else {
    res.status(401).send({ message: "verification failed" });
  }
});

app.get("/user/addtocart/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(req.headers.token);
    const user = await FoodUser.findOne({ token: req.headers.token });
    console.log(user);
    await FoodUser.findOneAndUpdate(
      { token: req.headers.token },
      { currOrder: [...user.currOrder, { product_id: id, count: 1 }] }
    );
    res.status(201).send({ message: "cart updated" });
  } catch {
    res.status(401).send({ message: "error occured" });
  }
});

app.get("/user/cartItems", async (req, res) => {
  const user = await FoodUser.findOne({ token: req.headers.token });
  if (user) {
    res.send({ items: user.currOrder });
  } else {
    res.status(401).send({ message: "no user found" });
  }
});

app.get("/user/incrementcount/:productid", async (req, res) => {
  const product_id = req.params.productid;
  console.log(product_id);
  const user = await FoodUser.findOne({ token: req.headers.token });
  const currOrder = user.currOrder;
  console.log(currOrder);
  const newCurrOrderItem = await currOrder.find(
    (e) => e.product_id == product_id
  );
  console.log(newCurrOrderItem);
  newCurrOrderItem.count++;
  await FoodUser.updateOne({ currOrder: currOrder });
  await user.save();
  res.send({ message: "counter incremented" });
});

app.get("/user/decrementcount/:productid", async (req, res) => {
  const product_id = req.params.productid;
  const user = await FoodUser.findOne({ token: req.headers.token });
  const currOrder = user.currOrder;
  const newCurrOrderItem = await currOrder.find(
    (e) => e.product_id == product_id
  );

  if (newCurrOrderItem.count == 1) {
    console.log("count is one");
    let newarr = currOrder.filter((e) => e != newCurrOrderItem);
    console.log(newarr);
    await FoodUser.updateOne({"token": req.headers.token},{ currOrder: newarr });
  } else {
    newCurrOrderItem.count--;
    await FoodUser.updateOne({ currOrder: currOrder });
  }

  await user.save();
  res.send({ message: "counter incremented" });
});

app.listen(5002, () => console.log("listening to 5002"));
