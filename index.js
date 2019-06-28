const express=require("express")
const bodyParser =require("body-parser")
// const logger=require("morgan")
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const cors=require("cors")
var multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

const server=express();
server.use(bodyParser.json())
// server.use(bodyParser.urlencoded())
// server.use(logger())
server.use(cors());
server.use(express.static('uploads'));
server.use(express.static('build'));
mongoose.connect(
    "mongodb+srv://NaberaHarsh:Harsh@1998@cluster0-ogovh.mongodb.net",{dbName:'Mahek_Jewellery',useNewUrlParser: true} // Change test to name of your DB
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });
// mongoose.connect('mongodb://localhost:27017/Mahek_Jewellery', {useNewUrlParser: true});


const productSchema= new Schema({
category:String,
id:Number,
name:String,
price:Number,
jewellery_type:String,
ocassion:String,
image:String,
desc:String ,
best:String,
new:String
})

const subscribeSchema= new Schema({
mail:String
})
const accountSchema= new Schema({
    name:String,
    phone:String,
    mail:String,
    pass:String
    })

const feedbackSchema= new Schema({
    category:String,
    ontime:String,
    satisfy:String,
    area:String,
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
cartinfo:Array,
name:String,
          house:String,
          street:String,
          city:String,
          state:String,
          pincode:Number,
          mail:String,
          pno:Number,
          date:{type:Date, default: Date.now}

})


const Product=mongoose.model('Product',productSchema);
const Cart=mongoose.model('Cart', cartSchema)
const Address= mongoose.model('Address', addressSchema)
const Order= mongoose.model('Order', orderSchema)
const Feedback= mongoose.model('Feedback', feedbackSchema)
const Subscribe= mongoose.model('Subscribe', subscribeSchema)
const Account= mongoose.model('Account', accountSchema)


server.post('/profile', upload.single("file"), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file.filename);
    // req.body will hold the text fields, if there were any
    res.json(req.file.filename);
  })


server.post("/product",(req,res)=>{
    let product= new Product();

    product.category=req.body.category;
    product.id=req.body.id;
    product.name=req.body.name;
    product.price=req.body.price;
    product.jewellery_type=req.body.jewellery_type;
    product.ocassion=req.body.ocassion;
    product.image= req.body.image;
    product.desc=req.body.desc;
    product.best=req.body.best;
    product.new=req.body.new;



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

server.post("/account",(req,res)=>{
    let account=new Account();

    
    account.name=req.body.name;
    account.phone=req.body.phone;
    account.mail=req.body.mail;
    account.pass=req.body.pass;

    console.log(account);
    account.save();
    res.json(account);
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
   order.name=req.body.name;
    order.house=req.body.house;
    order.street=req.body.street;
    order.city=req.body.city;
    order.state=req.body.state;
    order.pincode=req.body.pincode;
    order.mail=req.body.mail;
    order.pno=req.body.pno;
    order.date=new Date();
    
    console.log(order);
    order.save();
    res,json(order)
})

server.post("/feedback",(req,res)=>{
            let feedback= new Feedback();
        
            feedback.category=req.body.category;
            feedback.ontime=req.body.ontime;
            feedback.satisfy=req.body.satisfy;
            feedback.area=req.body.area;
                          
            console.log(feedback);
            feedback.save();
            res.json(feedback);
        })

        server.post("/subscribe",(req,res)=>{
            let subscribe= new Subscribe();
        
            subscribe.mail=req.body.mail;
                          
            console.log(subscribe);
            subscribe.save();
            res.json(subscribe);
        })


server.get("/read/:category",function(req,res){
    Product.find({category:req.params.category},function(err,doc){
        res.json(doc);
        console.log(doc);          
    })
})

server.get("/type/:name",function(req,res){
    Product.find({jewellery_type:req.params.name},function(err,doc){
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
server.get("/getorder",function(req,res){
    Order.find({},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/sortAscending/:category",function(req,res){
    Product.find({category:req.params.category},function(err,doc){
        res.json(doc);
        console.log(doc);
    }).sort({price:1})
})

server.get("/sortDescending/:category",function(req,res){
    Product.find({category:req.params.category},function(err,doc){
        res.json(doc);
        console.log(doc);
    }).sort({price:-1})
})

server.delete("/deleteCartItem/:id",(req,res)=>{
    Cart.findOneAndDelete({_id:req.params.id},function(err,doc){
        console.log(doc);
        res.json(doc);
    })
})

server.get("/filter0/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {price:{$lt:500}} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/filter500/:flag", function(req,res){
    console.log(req.params.flag)
    Product.find({$and: [ {category:req.params.flag} , {price:{$gte:500}}, {price:{$lt:1500}} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/filter1500/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {price:{$gte:1500}}, {price:{$lt:2500}} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/filter2500/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {price:{$gte:2500}}, {price:{$lt:5000}} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/filter5000/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {price:{$gte:5000}} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/AD/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {jewellery_type:"AD"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/VJ/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {jewellery_type:"Victorian Jewellery"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})

server.get("/AM/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {jewellery_type:"Antique Items"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})
server.get("/wedding/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {ocassion:"Wedding"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})
server.get("/diwali/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {ocassion:"Diwali"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})
server.get("/navratra/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category}, {ocassion:"Navratra"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})
server.get("/best/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {best:"Yes"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})
server.get("/newArrival/:category", function(req,res){
    Product.find({$and: [ {category:req.params.category} , {new:"Yes"} ]},function(err,doc){
        res.json(doc);
        console.log(doc);
    })
})



server.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './build/')});
  });


server.listen(8080,()=>{
    console.log("server has started")
})

