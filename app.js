const fs = require("fs");                   // Node Module for File Handling
const bodyParser = require("body-parser");  // Node Module for getting query params
const express = require("express");         // Node Module for Routing
const app = express();

const cors=require('cors')
const path = require('path')
const mongoose=require('mongoose')
const {port, db_url}=require('./config')

const Student=require('./models/studentModel')
app.set('views', path.join(__dirname, 'views'))

app.set("view engine", "ejs");              // Using EJS as our view engine
app.use(bodyParser.urlencoded());
app.use(cors())

mongoose.connect(db_url).then(()=>{
    console.log(`Connected to database`)

}).catch(error=>{
    console.log(`Could not connect to database`)
})

//let students =[]// JSON.parse(fs.readFileSync("data.json")); // Getting all the students at once in the beginning...

app.get("/", async(req, res) => {
  console.log("Ok")  
  res.render("index"); // displaying the all Students page
});

app.get("/new", (req, res) => {
  res.render("new"); // displaying the new student page
});

app.get("/students",(req, res) => {

    Student.find().then(result=>res.send(result));
    // res.send({students:students.json()}); // sending data of all students in json format to client.
});

app.post("/students", (req, res) => {
  // accepts params as body and assigns ID to the student and adds the student to the students JSON object
  const student = req.body;
  console.log(student)
  students.students.push(student);
  len = students.students.length;
  if (len == 1) {
    students.students[len - 1].id = 1;
  } else {
    students.students[len - 1].id = students.students[len - 2].id + 1;
  }
  // Convert the students json object to string and overwrites it to data.json
  var jsonContent = JSON.stringify(students);
  fs.writeFile("data.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return res.send({ msg: "Failure!!" });
    }
    res.redirect("/");
  });
});

app.delete("/students", (req, res) => {
  // gets the user id and finds the user in the students json object
  id = req.body.id;
  for (var i in students.students) {
    if (students.students[i].id == id) {
      students.students.splice(i, 1); // deletes user upon finding
      // converts the students json object to string and overwrites it to data.json
      var jsonContent = JSON.stringify(students);
      fs.writeFile("data.json", jsonContent, "utf8", function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return res.send({ msg: "Failure!!" });
        }
      });
      res.send({ msg: "Success" });
      return;
    }
  }
  res.send({ msg: "Failure" });
});

app.listen(port, () => console.log(`Server Listening on Port ${port}!!`));
