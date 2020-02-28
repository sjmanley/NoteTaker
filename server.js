var express = require("express")
var path = require("path")

//sets up express app
var app = express();

app.use(express.static('assets'));
var PORT = process.env.PORT || 3000;

//sets up express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.post('/api/notes', (req, res) => {
    // Get the Data
    const data = req.body;
    // Create Unique ID
    const id = Date.now();
    // Read the DB file
    const db = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8');
    // Add the Note object
    const note = {
      id: id,
      title: data.title,
      text: data.text,
    };
    const dbObj = JSON.parse(db);
    dbObj.push(note);
    // Save the DB file
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbObj), 'utf8');
    // Return the DB file
    res.sendFile(path.join(__dirname, '/db/db.json'));
  });
  
  app.delete('/api/notes/:id', (req, res) => {
    // Get the ID
    const id = req.params.id;
    // const id = req.url.split('/')[3];
    // Read the DB file
    const db = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8');
    // Remove the Object with ID
    const dbObj = JSON.parse(db);
    for (let x = 0; x < dbObj.length; x++) {
      if (dbObj[x].id.toString() === id) {
        dbObj.splice(x, 1);
        break;
      }
    }
    // Save the DB file
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbObj), 'utf8');
    // Return the DB file
    res.sendFile(path.join(__dirname, '/db/db.json'));
  });


//start server to listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});