import { useAuthState } from "react-firebase-hooks/auth";
import * as firebase from "firebase";
import {
	createMuiTheme,
	Card,
	Box,
	Typography,
	Button,
	Input,
	FormGroup,
	InputLabel,
	TextField,
	CardContent,
	Grid,
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
				<Box mt={10} />
				<Typography style={{ color: "white" }} variant="h3">
					Initialising User...
				</Typography>
			</Box>
		);
	} else if (error) {
		return (
			<div>
				<Typography>Error: {error}</Typography>
			</div>
		);
	} else if (user) {
		return (
			<Box className={classes.tealBox} px={2} py={2}>
				<Layout />
				<Box></Box>
				<Typography>Current User: {user.email}</Typography>
				<Button variant="contained" onClick={logout}>
					Log out
				</Button>
			</Box>
		);
	} else {
		return (
			<Box className={classes.tealBox} px={2} py={2}>
				<Layout />
				<Grid className="auth-login" justify="center" container>
					<Grid item xs={12} sm={6} md={4}>
						<Card>
							<CardContent>
								<form>
									<InputLabel>User Name</InputLabel>
									<TextField />
									<InputLabel>Password</InputLabel>
									<TextField type="Password" />
								</form>
								<Button
									color="primary"
									variant="contained"
									onClick={login}>
									Log In
								</Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		);
	}
}

export default withStyles(styles(theme))(AuthPage);
