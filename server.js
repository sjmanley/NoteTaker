const express = require("express")
const path = require("path")
const fs = require("fs");

//sets up express app
const app = express();
const dbFile = "db/db.json";

app.use(express.static("assets"));
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
app.get("api/notes", (req, res) => {
    // Return the DB file
    res.sendFile(path.join(__dirname, "db/db.json"));
  });
app.post("api/notes", (req, res) => {
    const data = req.body;
    const id = Date.now();
    const db = fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8");
    const note = {
      id: id,
      title: data.title,
      text: data.text,
    };
    const dbObj = JSON.parse(db);
    dbObj.push(note);
    fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(dbObj), "utf8");
    res.sendFile(path.join(__dirname, "db/db.json"));
  });
  
  app.delete("api/notes/:id", (req, res) => {

    const id = req.params.id;

    const db = fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8");

    const dbObj = JSON.parse(db);
    for (let x = 0; x < dbObj.length; x++) {
      if (dbObj[x].id.toString() === id) {
        dbObj.splice(x, 1);
        break;
      }
    }

    fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(dbObj), "utf8");
    // Return the DB file
    res.sendFile(path.join(__dirname, "db/db.json"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

function getNewId() {
    let newId = {};
    console.log(dbNotes);
    if (typeof dbNotes.id === "undefined") {
      newId.id = 0;
    }
    else {
      console.log (dbNotes[0].id);
      newId.id = dbNotes[dbNotes.length -1].id + 1; //gets last ID 
    }
    debug && console.log(`lastID of getNewId: ${newId}`);
    return newId;
  }