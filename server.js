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
let schema = new Schema({
	word: String,
	pos: String,
	def: String,
});
const Card = mongoose.model("Card", schema);
schema = new Schema({
	FirstName: String,
	LastName: String,
	Stacks: Object,
});
const Person = mongoose.model("Person", schema);
// mongodb+srv://new-user:123@cluster0-gzyjc.mongodb.net/flashcards?retryWrites=true&w=majority
// mongodb://localhost:27017/test
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

app.get("/word", (req, res) => {
	Card.find((err, words) => {
		if (err) return console.error(err);
		res.send(words);
	});
});

app.delete("/word", (req, res) => {
	Card.remove({}, function(err) {
		if (err) return console.error(err);
		console.log("collection removed");
		res.send("ALL DELETED");
	});
});

app.post("/person", (req, res) => {
	let person = new Person({
		FirstName: "Sample",
		LastName: "Person",
		Stacks: undefined,
	});
	person.save();
	res.send("myes");
});

app.put("/person", (req, res) => {
	let search = Person.find().size;
	if (search == null || search == undefined) {
		res.send("oops");
	} else {
		res.send("yes, " + search);
	}
});

app.listen(port, () => {
	console.log("server is now listening on 3001");
});
