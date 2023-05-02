const express = require("express");
var cors = require('cors')
const fs = require("fs");
const path = require("path");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(cors())
app.use(express.static("./views"));
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/")
})

app.get("/api/files*", (req, res) => {
    var directoryPath;
    // if(req.query.path) directoryPath = "./" + req.query.path;
    // else  directoryPath = "./all";
    if(req.query.path) directoryPath = "gs://note-ec39d.appspot.com/" + req.query.path;
    else  directoryPath = "gs://note-ec39d.appspot.com//";

  const files = fs.readdirSync(directoryPath);
  const data = [];

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    data.push({
      name: file,
      isDirectory: stats.isDirectory(),
      path: filePath,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
    });
  });
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
