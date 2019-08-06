const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
let collection;
const MongoClient = require("mongodb").MongoClient;
const uri =
	"mongodb+srv://new-user:123@cluster0-gzyjc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	if (err) {
		return console.log(err);
	}
	const collection = client.db("test").collection("devices");
	// perform actions on the collection object
	client.close();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/hello", (req, res) => res.send("whats good"));

app.post("/", (req, res) => {
	console.log(req.body);
	res.send(req.body);
});
