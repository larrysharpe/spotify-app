const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
require("./routes/tracks.routes")(app);
require("./routes/search.routes")(app);

db.sequelize.sync();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "The App Works" });
});

// set port, listen for requests
const PORT = process.env.PORT || 1981;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});