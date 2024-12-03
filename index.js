import express from "express";
import cors from "cors" //this is to open in react
const app = express();  

app.listen(8080,()=>{
    console.log("Server started at 8080 port")
}
)
app.use(cors())
app.use(express.json())
// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })

// app.get("/name",(req,res)=>{
//         res.send("Vamsi")

//})
// app.get("/products",(req,res)=>{
//         let products ={
//             "name" : "Product1",
//             "price":34
//         }
//         res.json(products)
// })


// app.get("/customers",(req,res)=>{
//     let customers ={
//         "name" : "boku",
//         "price":34
//     }
//     res.json(customers)
// })



import {MongoClient, ObjectId} from "mongodb";
// const uri = "mongodb://127.0.0.1:27017"
const usr = encodeURIComponent("vamsinaishadham")
const pwd = encodeURIComponent("EUG7y8EHVO5qJ8zb")
const uri = `mongodb+srv://vamsinaishadham:EUG7y8EHVO5qJ8zb@cluster0.mh7a8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri)
const db = client.db("ecomm")

    

app.get("/",async(req,res)=>{
    const items = await db.collection("products").find().toArray()
    res.status(200).json(items)


        
});



app.post("/", async (req, res) => {
    const { name, price,desc,url } = req.body;
    const data = {
      name: name,
      price: price,
      desc:desc,
      url:url,
      
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
});