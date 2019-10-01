import sleep from "../universal/sleep";
import axios from "axios";

export async function pullCards(person, cardSet) {
	// You can await here
	console.log("BEFORE SLEEP");
	let id = await sleep(100).then(() => {
		for (let i = 0; i < 3; ++i) {
			try {
				return person.email;
			} catch (error) {
				console.log("Trying again");
				sleep(500);
			}
		}
	});
	console.log("AFTER SLEEP");
	console.log("ID: " + id);
	const params = new URLSearchParams();
	params.append("usr", id);
	axios("http://localhost:3001/userWords", { params: { usr: id } })
		.then(response => {
			cardSet(response.data);
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		});
}