//const express = require("./node_modules/express")
const express = require("express");
//Import the mongoose module
const mongoose = require("mongoose");

//You need to use bodyParser() if you want the form data to be available in req.body.
const bodyParser = require("body-parser");

//
const passport = require("passport");

//create access to the API from the server
const admins = require("./routers/api/admins");
const branch = require("./routers/api/branch");
const mador = require("./routers/api/mador");
const games = require("./routers/api/games");
const document = require("./routers/api/document");
const powerpoint = require("./routers/api/powerpoint");
const category = require("./routers/api/category");
const subcategory = require("./routers/api/subcategory");
const product = require("./routers/api/product");
const abguidancedocument = require("./routers/api/abguidancedocument");
const file = require("./routers/api/file");
const guidances = require("./routers/api/guidances");
const ideals = require("./routers/api/ideals");
const news = require("./routers/api/news");
const commanderWords = require('./routers/api/commanderWords.js');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const tutorials = require("./routers/api/tutorials");
const config = require("./config/config");
const picture = require("./routers/api/picture");
const album = require("./routers/api/album");

//returns the express class - lets us use http request
const app = express();
app.use(cors());
app.use(fileUpload());
//Body-Parser is a library that you can use as middleware when handling Node.js GET and POST requests.
//This module provides the following parsers: JSON, Raw, text and URL-encoded.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json
const url = config.dbUrl;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("yay ! mongoDb connected"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("Hello HI"));

app.use(passport.initialize());

//All the configuration for passport will be handled in config/passport.js
// we pass our passport object to our config/passport.js file. This is where we configure our Strategy
require("./config/passport")(passport);

//create routers for each api object - set the link
app.use("/api/branch", branch);
app.use("/api/mador", mador);
app.use("/api/admins", admins);

app.use("/api/games", games);
app.use("/api/category", category);
app.use("/api/subcategory", subcategory);
app.use("/api/product", product);
app.use("/api/abguidancedocument", abguidancedocument);
app.use("/api/file", file);
app.use("/api/guidances", guidances);
app.use("/api/ideals", ideals);
app.use("/api/news", news);
app.use("/api/document", document);
app.use("/api/powerpoint", powerpoint);
app.use('/api/commanderwords', commanderWords);
app.use("/api/picture", picture);
app.use("/api/album", album);
// app.use("/api/tutorials", tutorials);

const port = process.env.Port || config.port;

app.listen(port, () => console.log(`server running on port ${port}`));
