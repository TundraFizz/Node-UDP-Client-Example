var app    = require("../main.js");
var io     = app.io;
var socket = null;
var fs     = require("fs"); // File system library
// var axios = require("axios");

app.get("/", async function(req, res){
  var string = "A string from the server.";

  res.render("index.ejs");
});

app.get("/about", function(req, res){
  var people = CsvToObject("data/people.csv");
  res.render("about.ejs", {people: people});
});

//////////////////////////////////////////////////////////////////////

app.post("/submit", function(req, res){
  var packet = JSON.stringify(req.body);
  var message = new Buffer(packet);
  client.send(message, 0, message.length, 9000, "localhost");
  res.status(200);
});

//////////////////////////////////////////////////////////////////////

var client = require("dgram").createSocket("udp4").bind(process.env.port);

client.on("message", async(message) => {
  var data = JSON.parse(message.toString("utf-8"));
  console.log(data);
  io.emit("testing", data);
});

client.on("listening", () => {
  console.log(`Listening on port ${client.address().port}`);
});

//////////////////////////////////////////////////////////////////////

io.on("connection", function(socket){
  console.log("SOCKET CONNECTED!");
  io.emit("testing", "REEEEEEEEEE");
});

app.use(function (req, res){
  res.render("404.ejs");
});
