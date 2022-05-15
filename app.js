const fs = require("fs");                   // Node Module for File Handling
const bodyParser = require("body-parser");  // Node Module for getting query params
const express = require("express");         // Node Module for Routing
const app = express();

const cors=require('cors')
const path = require('path')
const mongoose=require('mongoose')

const Student=require('./models/studentModel')
app.set('views', path.join(__dirname, 'views'))

const db_url="mongodb+srv://iwa-ca2-app:iwa-ca2-app@iwa-ca2-cluster.1kkek.mongodb.net/iwa-ca2-db?retryWrites=true&w=majority"
const port=process.env.PORT || 5666

app.set("view engine", "ejs");              // Using EJS as our view engine
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true  }).then(()=>{
    console.log(`Connected to database`)

}).catch(error=>{
    console.log(`Could not connect to database`)
})


app.get("/", async(req, res) => {

  res.render("index"); // displaying the all Students page
});

app.get("/new", (req, res) => {
  res.render("new"); // displaying the new student page
});

app.get("/students",(req, res) => {

    Student.find().then(result=>res.send(result));
});

app.post("/students", async(req, res) => {
  // accepts params as body and assigns ID to the student and adds the student to the students JSON object

  let record=await Student.find({},{id:1,_id:0}).sort({id:-1}).limit(1)
  console.log(record[0].id)
  let id=record[0].id;
  const student=new Student({
    name:req.body.name,
    degree:req.body.degree,
    cgpa:req.body.cgpa,
    id:id+1
  })
  student.save().then(result=>res.redirect("/")).catch(err=>res.send("Error occured"))
});

app.delete("/students",(req, res) => {
  const id = req.body.id;
  Student.deleteOne({id:id}).then(result=>res.redirect('/')).catch(err=>res.send('Error occured'))

});

app.listen(port, () => console.log(`Server Listening on Port ${port}!!`));
