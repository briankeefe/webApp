import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box, Grid, Card, CardContent, TextField, Button } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import Launch from "../src/universal/launchFirebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import * as firebase from "firebase";
import Link from "next/link";
import "../css/style.scss";
const theme = createMuiTheme({
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		color: "white",
	},
	outerBox: {
		backgroundColor: teal[500],
		padding: theme.spacing(3),
		margin: "auto",
		minHeight: "100vh",
	},
	paper: {
		minHeight: "15vh",
	},
});

function AlphaPage(props) {
	const { classes } = props;
	Launch();
	let router = useRouter();
	useEffect(() => {
		console.log("Alpha Effect");
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
	if (user) {
		return (
			<Box className={classes.tealBox} px={2} py={2}>
				<Layout />
				<Grid className="auth-login" justify="center" container>
					<Grid item xs={12} sm={6} md={4}>
						<Card>
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
			<Box className={classes.tealBox} px={2} py={2}>
				<Layout />
				<Grid className="auth-login" justify="center" container>
					<Grid item xs={12} sm={6} md={4}>
						<Card>
							<CardContent>
								<form>
									<TextField label="User Name" />
									<TextField
										label="Password"
										type="Password"
									/>
								</form>
								<Button
									color="primary"
									variant="contained"
									onClick={login}>
									Log In
								</Button>
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
export default withStyles(styles(theme))(AlphaPage);
