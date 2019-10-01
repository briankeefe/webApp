export default (milliseconds) => {
	console.log("SLEEPING FOR " + milliseconds + " milliseconds.");
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};