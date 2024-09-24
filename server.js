
require('dotenv').config()
const {MongoClient, ObjectId} = require("mongodb")
const client = new MongoClient(process.env.uri)//if this doesn't work on upload, try to route through actual .env file
const express = require('express')
const app = express(); 
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var taskList = []
const PORT = 3000;
var post = ""

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });//what does next do here? allows next function to run 

app.get("/download", async (req, res) => {
  var temp = await retrieveLastPost(client)
  console.log("printing temp")
  console.log(temp)
    res.json({ message: temp});
  });

app.post("/upload", jsonParser, async (req, res) =>{
  taskList = req.body;
  console.log(req.body)
  
  await savePost(client, taskList)
})

async function savePost(client, post)
{  try{
   // var tempDate = Date.now()
    await client.connect(); 
    //await client.db.collection("postStorage").deleteMany({})
    var result = await client.db("myDB").collection("postStorage").insertOne({postContent: post, timeUploaded: new Date()}); 
    console.log("inserting last post")
    console.log(result)

  }
  catch(error){
    console.log("error in saving last post")
    console.error(error)
  }
  finally{
    await client.close()
  }
}
async function retrieveLastPost(client)
{
  try{
    await client.connect()
    var queryResults = await client.db("myDB").collection("postStorage").find().sort({timeUploaded:-1}).limit(1).toArray()
    output = queryResults[0].postContent
    console.log(output)
    //var retreivedQuery = await client.db("myDB").collection("postStorage").find().sort({_id:-1}).limit(1)
    //not sure why this double layering is needed
    //var output = await client.db("myDB").collection("postStorage").find().sort({_id: -1}).limit(1) //this does not work as planned5
    await client.close()
    console.log("retrieving last post from db")
    return output
  }
  catch(error){
    console.log("error in retrieving last post")
    console.error(error)
  }
  finally{
   await client.close()
  }
}
  


  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});