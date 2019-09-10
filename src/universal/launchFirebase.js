import * as firebase from "firebase";
import firebaseConfig from "../../config/firebaseConfig";

export default () => {
	console.log("Launching Firebase");
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}
};
