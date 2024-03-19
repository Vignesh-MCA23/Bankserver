const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

app.get('/', (req, res) => {
  res.send('<h1> Welcome </h1>')
})

app.get('/data',(req,res)=>{
    Data.find().then((item)=>res.send(item))
})

app.post('/create',function(req,res){
    Data.create(req.body).then((item)=>res.send(item))
})

app.put('/update/:id',async(req,res)=>{
    console.log(req.params.id);
     console.log(req.body);
   const amount = req.body.amount;
   
  const userUpdate= await Data.findByIdAndUpdate(req.params.id,{amount:amount},{new:true,});
    res.json({
     data:userUpdate
})
})

app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params.id);
    const userDelete= await Data.findByIdAndDelete(req.params.id);
    res.json({
     data:userDelete
})
})



// Connect Mongodb
mongoose.connect('mongodb+srv://suviramsridhar2000:vignesh@cluster0.ryonfnu.mongodb.net/poj').then(console.log("MongoDB connected successfully"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
// create a schema
var newSchema=new mongoose.Schema(
    { 
        id:Number,
        name:String,
        email:String,
        password:String,
        amount:Number
    }
)

// model
let Data=mongoose.model('proj',newSchema);

// Create a data for testing
// let data1=new Data(
//     {
//         name:"Vignesh",
//         email:"suviramsridhar@gmail.com",
//         password:"vicky",
//         amount:1000
//     }
// )
// data1.save();