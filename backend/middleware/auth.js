const jwt= require("jsonwebtoken");
const {Food, FoodUser, FoodAdmin}= require("../db/index");
let jwtsecret= "secR3t";

const checkAllreadyExist=(req, res, next)=>{
    
    let user= FoodUser.findOne({username: req.body.username});

    if(user){
        res.status(401).send({"message": "user allready exists"});
    }else{
        next();
    }
}

const validateJWT=(req, res, next)=>{
    const user= FoodUser.findOne({username:req.body.username});
    jwt.verify(user.token,jwtsecret, (err, decoded)=>{
        if(err){
            res.status(401).json({"message":"invalid user"});
        }else{
            next();
        }
    } )

}

module.exports= {checkAllreadyExist, validateJWT};