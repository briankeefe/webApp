export default (s) => {
	let str;
	try{
		str = String(s);
	} catch(error){
		console.log("ERROR while checking email..." + error);
		return false;
	}
	if (str.includes("@")) {
		if(!str.includes(" ")){
			if(str.length < 20){
				return true;
			}
		}
	} else {
		return false;
	}
};