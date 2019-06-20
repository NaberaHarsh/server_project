const express=require("express")
const bodyParser =require("body-parser")
// const logger=require("morgan")
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const cors=require("cors")

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
img: { data: Buffer, contentType: String }
})


const Product=mongoose.model('Product',productSchema);


server.post("/product",(req,res)=>{
    let product= new Product();

    product.category="earring";
    product.id="3";
    product.name="new earring";
    product.price="800";
    product.jewellery_type="AD";
    product.ocassion="diwali";
    product.img="../asset/earring.jpg"

    console.log(product);
    product.save();
    res.json(product);
})


server.get("/earring",function(req,res){
    Product.find({category:"Earring"},function(err,doc){
        res.json(doc);
        console.log(doc);
        
               
    })
})


server.listen(8080,()=>{
    console.log("server has started")
})

