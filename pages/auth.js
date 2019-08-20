import { useAuthState } from "react-firebase-hooks/auth";
import * as firebase from "firebase";
import { createMuiTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const theme = createMuiTheme({
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
});

function AuthPage(props) {
	const { classes } = props;
	const [user, loading, error] = useAuthState(firebase.auth());

	var firebaseConfig = {
		apiKey: "AIzaSyAwMIqSwJE9iL0ZlWyd3hrepk5Mymn7lSI",
		authDomain: "flashcards-cda38.firebaseapp.com",
		databaseURL: "https://flashcards-cda38.firebaseio.com",
		projectId: "flashcards-cda38",
		storageBucket: "flashcards-cda38.appspot.com",
		messagingSenderId: "872718028889",
		appId: "1:872718028889:web:a95585059bf6d551",
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	const login = () => {
		firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
	};

	const logout = () => {
		firebase.auth().signOut();
	};

	if (loading) {
		return (
			<div>
				<p>Initialising User...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<p>Error: {error}</p>
			</div>
		);
	}

	if (user) {
		return (
			<div>
				<p>Current User: {user.email}</p>
				<button onClick={logout}>Log out</button>
			</div>
		);
	}
	return <button onClick={login}>Log in</button>;
}

export default withStyles(styles(theme))(AuthPage);
