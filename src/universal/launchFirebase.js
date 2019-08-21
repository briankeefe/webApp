import * as firebase from "firebase";
import firebaseConfig from "../../config/firebaseConfig";

export default () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}
};
