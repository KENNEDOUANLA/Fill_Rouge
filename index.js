const { USER } = require('./models/index');
const { Route } = require("./routes");

const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.listen(process.env.PORT || 80, () => console.log("serveur on port :", process.env.PORT || 80));
app.use('', Route);


//USER.findAll().then((result) => console.log("result", result));