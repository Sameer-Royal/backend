const express = require('express');
const {MongoClient}=require('mongodb');
const MongoStore = require('connect-mongo');
const cors=require('cors');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors());
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Boat';
var collection;
async function connection() {
  await client.connect();
  db = client.db(dbName);
  collection = db.collection("all");
}
connection();
app.use(express.urlencoded({ extended: true }))

app.listen(8000, (req, res) => {
    console.log('server is working')
})
app.get((req,res)=>{
  console.log('successful')
  getData()
  .then(response=>{
      console.log(response);
      res.send(JSON.stringify(response));
      // res.send(products)
  })
  .catch(error=>{
    console.log(error)
  })
})

async function getData(){
  const findResult = await collection.find().toArray();
  return findResult;
}