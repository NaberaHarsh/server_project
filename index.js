const express=require("express")
const bodyParser =require("body-parser")
// const logger=require("morgan")
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const cors=require("cors")
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const server=express();

server.use(bodyParser.json())
// server.use(bodyParser.urlencoded())
// server.use(logger())
server.use(cors());

mongoose.connect('mongodb://localhost:27017/Mahek_Jewellery', {useNewUrlParser: true});


const productSchema= new Schema({
category:String,
id:Number,
name:String,
price:Number,
jewellery_type:String,
ocassion:String,
image:String
})

const cartSchema= new Schema({
    id:Number,
    name:String,
    price:Number,
    image:String,
    quantity:Number
})

const addressSchema= new Schema({ 
          name:String,
          house:String,
          street:String,
          city:String,
          state:String,
          pincode:Number,
          mail:String,
          pno:Number      
})

const orderSchema = new Schema({
cartinfo:String,
address:String
})


const Product=mongoose.model('Product',productSchema);
const Cart=mongoose.model('Cart', cartSchema)
const Address= mongoose.model('Address', addressSchema)
const Order= mongoose.model('Order', orderSchema)

server.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.json(req.file)

    let product= new Product();

    product.image=req.file.path;
    product.save();
  
  })


server.post("/product",(req,res)=>{
    let product= new Product();

    product.category=req.body.category;
    product.id=req.body.id;
    product.name=req.body.name;
    product.price=req.body.price;
    product.jewellery_type=req.body.jewellery_type;
    product.ocassion=req.body.ocassion;

    console.log(product);
    product.save();
    res.json(product);
})

server.post("/showcart",(req,res)=>{
    let cart=new Cart();

    cart.id=req.body.id;
    cart.name=req.body.name;
    cart.price=req.body.price;
    cart.quantity="1";
    cart.image=req.body.image;

    console.log(cart);
    cart.save();
})

server.post("/userAddress",(req,res)=>{
    let address= new Address();

    address.name=req.body.name;
    address.house=req.body.house;
    address.street=req.body.street;
    address.city=req.body.city;
    address.state=req.body.state;
    address.pincode=req.body.pincode;
    address.mail=req.body.mail;
    address.pno=req.body.pno;
   
    console.log(address);
    address.save();
    res.json(address);
})

server.post("/showorder",(req,res)=>{
    let order=new Order();

    order.cartinfo=req.body.cartinfo;
    order.address=req.body.address;
    
    console.log(order);
    order.save();
})


server.get("/earring",function(req,res){
    Product.find({category:"Earring"},function(err,doc){
        res.json(doc);
        console.log(doc);
        
               
    })
})

server.get("/cartItem",function(req,res){
    Cart.find({},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/getAddress",function(req,res){
    Address.find({},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.delete("/deleteCartItem/:id",(req,res)=>{
    Cart.findOneAndDelete({_id:req.params.id},function(err,doc){
        console.log(doc);
        res.json(doc);
    })
})




server.listen(8080,()=>{
    console.log("server has started")
})

