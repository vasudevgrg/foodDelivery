const mongoose= require("mongoose");

const food= mongoose.Schema({
    catagory:{
        type:String
    },
    items:[{
        title: String,
        description: String,
        price: Number,
        url: String
    }]
});

const foodUser=mongoose.Schema({
    username: String,
    password: String,
    uniqueNum: Number,
    prevOrders: Array,
    currOrder: [{
        product_id:mongoose.Types.ObjectId,
        count:Number
    }],
    token: String
});

const foodAdmin= mongoose.Schema({
    username: String,
    password: String,
    token: String
});

const Food= mongoose.model("Food", food);
const FoodUser= mongoose.model("FoodUser", foodUser);
const FoodAdmin= mongoose.model("FoodAdmin", foodAdmin);


module.exports={
    Food, FoodAdmin, FoodUser
}