var express = require ("express");

var app = express ();

var PORT = process.env.port || 3000;

app.use(expree.urlencoded({extended: true}));
app.use (express.json());

require ("./api")(app);
require ("./html")(app);

app.listen(PORT, function() {
    console.log ("app listening on port: " + PORT);
});







