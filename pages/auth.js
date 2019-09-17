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
import { useRouter } from "next/router";
import "../css/style.scss";
import Link from "next/link";
import Launch from "../src/universal/launchFirebase.js";
import { theme, backgroundColor } from "../src/universal/theme";

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},

	tealBox: {
		backgroundColor: backgroundColor,
		color: "white",
		height: "100vh",
	},
});

function AuthPage(props) {
	const { classes } = props;
	const router = useRouter();
	useEffect(() => {
		console.log(router.query);
		if (router.query.fail === "true") {
			alert("PLEASE LOGIN TO ACCESS THIS PAGE");
		}
	}, []);

	const [user, loading, error] = useAuthState(firebase.auth());
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");


	const login = () => {
		console.log("Attempting Login");
		console.log("Email: " + email);
		console.log("Password Length: " + pass.length);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, pass).catch((error) => {
				alert("WRONG PASSWORD" + error);
			});

	};
	const logout = () => {
		firebase.auth().signOut();
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePass = (e) => {
		setPass(e.target.value);
	};

	if (loading) {
		return (
			<Box>
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
				<Grid className="auth-login" justify="center" container>
					<Grid item xs={12} sm={6} md={4}>
						<Card className="login-card">
							<CardContent>
								<Typography>
									Current User: {user.email}
								</Typography>
								<Button
									color="secondary"
									variant="contained"
									onClick={logout}>
									Log out
								</Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		);
	} else {
		return (
			<Box className={classes.tealBox} px={2}>
				<Grid className="auth-login" justify="center" container>
					<Grid item xs={12} sm={6} md={4}>
						<Card className="login-card">
							<CardContent>
								<Typography variant="h4">Log In</Typography>
								<form>
									<TextField value={email} onChange={handleEmail} label="User Name" />
									<TextField
										value={pass}
										onChange={handlePass}
										label="Password"
										type="Password"
									/>
									<Button
										color="primary"
										variant="contained"
										onClick={login}>
										Log In
									</Button>
								</form>

								<Link href="/register">
									<Button
										color="secondary"
										variant="contained">
										Register
									</Button>
								</Link>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		);
	}
}

export default withStyles(styles(theme))(AuthPage);
