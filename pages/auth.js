import { useAuthState } from "react-firebase-hooks/auth";
import * as firebase from "firebase";
import {
	createMuiTheme,
	Box,
	Typography,
	Button,
	Input,
	FormGroup,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import react, { useState, useEffect } from "react";
import Layout from "../src/universal/layout";

import { teal } from "@material-ui/core/colors";
<<<<<<< Updated upstream

=======
import Launch from "../src/universal/launchFirebase";
import { useRouter } from "next/router";
import "../css/style.scss";
>>>>>>> Stashed changes
const theme = createMuiTheme({
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},

	tealBox: {
		backgroundColor: teal[500],
		color: "white",
		height: "100vh",
	},
});

function AuthPage(props) {
	const { classes } = props;

	if (!firebase.apps.length) {
		let firebaseConfig = {
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
	}

	const [user, loading, error] = useAuthState(firebase.auth());

	const login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword("briguy100@gmail.com", "111397");
	};

	const logout = () => {
		firebase.auth().signOut();
	};

	if (loading) {
		return (
			<div>
				<Typography>Initialising User...</Typography>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<Typography>Error: {error}</Typography>
			</div>
		);
	}

	if (user) {
		return (
			<Box className={classes.tealBox} px={2} py={2}>
				<Layout />
				<Typography>Current User: {user.email}</Typography>
				<Button variant="contained" onClick={logout}>
					Log out
				</Button>
			</Box>
		);
	}
	return (
		<Box className={classes.tealBox} px={2} py={2}>
			<Layout />
			<Box pt={10} />
			<Button variant="contained" onClick={login}>
				Log in
			</Button>
			<Box p={3}>
				<FormGroup>
					<Input>UserName</Input>
					<Input>Password</Input>
				</FormGroup>
			</Box>
		</Box>
	);
}

export default withStyles(styles(theme))(AuthPage);
