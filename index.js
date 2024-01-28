// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  if (!req.params.date) {
    const date = new Date();
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
    return;
  }

  const isTimestampMillisecond = /^\d{13}$/.test(req.params.date);
  const dateObj = isTimestampMillisecond
    ? new Date(Number(req.params.date))
    : new Date(req.params.date);

  if (!isNaN(dateObj)) {
    res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
