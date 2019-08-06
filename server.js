const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
	word: String,
	pos: String,
	def: String,
});
const Card = mongoose.model("Card", schema);
const word = new Card({ word: "test", pos: "test", def: "test" });
word.save();
Card.find(function(err, words) {
	if (err) return console.error(err);
	console.log(words);
});
Card.remove({}, function(err) {
	console.log("collection removed");
});
mongoose.connect("mongodb://localhost/flashcards", {
	useNewUrlParser: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("CONNECTED");
});
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/hello", (req, res) => res.send("whats good"));

app.post("/word", (req, res) => {
	let word = new Card({
		word: req.body.word,
		pos: req.body.pos,
		def: req.body.def,
	});
	word.save();
	Card.find(function(err, words) {
		if (err) return console.error(err);
		let x = words;
		console.log(x);
		res.send(JSON.stringify(x));
	});
});

app.listen(port, () => {
	console.log("server is now listening on 3001");
});
