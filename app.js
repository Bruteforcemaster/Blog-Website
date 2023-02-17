const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const bodyparser = require("body-parser");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

//define mongoose schema

var ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

var Contact = mongoose.model('Contact', ContactSchema);



app.use("/static", express.static("static"));
app.use(express.urlencoded());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the database")
  }).catch(()=>{
    res.status(400).send("Item was not send to the database")
  });
  //res.status(200).render("contact.pug");
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
