var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string", (req, res) => {
  
  var dateString = req.params.date_string;
  var dateObject = {};
  
  // Normal date string
  if (dateString.includes("-") === true) {
    dateObject.unix = new Date(dateString).getTime();
    dateObject.utc = new Date(dateString).toUTCString();
  }
  // Unix time string
  else {
    var dateInt = parseInt(dateString);
    dateObject.unix = new Date(dateInt).getTime();
    dateObject.utc = new Date(dateInt).toUTCString();
  }

  // Invalid date string
  if (!dateObject.unix || !dateObject.utc){
    dateObject.error = "Invalid Date";
  }

  res.send(dateObject);
});

// Empty input string
app.get("/api/timestamp", (req, res) => {
  res.send({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  })  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
