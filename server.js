require('dotenv').config()

const express = require('express')
const app = express(); 
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var taskList = []
const PORT = process.env.PORT || 3000; 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });//what does next do here? allows next function to run 

app.get("/api", (req, res) => {
    res.json({ message: taskList});
    console.log(taskList)
  });

app.post("/upload", jsonParser, (req, res) =>{
  taskList = req.body;
  console.log(req.body)
})
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});