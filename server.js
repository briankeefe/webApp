const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
const port = 3001;

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
mongoose.connect(
	"mongodb+srv://new-user:123@cluster0-gzyjc.mongodb.net/flashcards?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
	}
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("CONNECTED");
});
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/hello", (req, res) => res.send("whats good"));

app.post("/word", (req, res) => {
	console.log(req.body);
	let word = new Card({
		word: req.body.word,
		pos: req.body.pos,
		def: req.body.def,
	});
	word.save();
	Card.find(function(err, words) {
		if (err) return console.error(err);
		let x = words;
		let arr = x.map(y => y.word);
		res.send(JSON.stringify(arr));
	});
});

// Placeholder
app.get("/word", (req, res) => {
	Card.find((err, words) => {
		if (err) return console.error(err);
		res.send(words);
	});
});

app.listen(port, () => {
	console.log("server is now listening on 3001");
});
