class Word {
	constructor(text, definition, pot) {
		this.word = text;
		this.def = definition;
		this.pot = pot;
	}
	getWord() {
		return this.word;
	}
}

export default Word;