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
import react, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../src/universal/layout";
import firebaseConfig from "../config/firebaseConfig";
import { teal } from "@material-ui/core/colors";
import Launch from "../src/universal/launchFirebase";
import { useRouter } from "next/router";
import "../css/style.scss";
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
	Launch();
	const router = useRouter();
	console.log(router.query);
	useEffect(() => {
		if (router.query.fail === "true") {
			alert("PLEASE LOGIN TO ACCESS THIS PAGE");
		}
	}, []);

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
			<Box>
				<Layout />
				<Typography style={{ color: "white" }} variant="h3">
					Initialising User...
				</Typography>
			</Box>
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
