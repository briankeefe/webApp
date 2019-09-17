import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box, Paper, Card, TextField, Button, Grid, CardContent } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import EmailCheck from "../src/logic/EmailCheck.js";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import * as firebase from "firebase";
import { theme, backgroundColor } from "../src/universal/theme";

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		color: "white",
	},
	outerBox: {
		backgroundColor: backgroundColor,
		padding: theme.spacing(3),
		margin: "auto",
		minHeight: "100vh",
	},
});

function RegistrationPage(props) {
	const { classes } = props;
	const router = useRouter();
	useEffect(() => {
		let testEmail = "test@test.com";
		console.log("Checking: " + testEmail);
		console.log(EmailCheck(testEmail));
	}, []);
	const [error, setError] = useState(false);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [rePass, setRePass] = useState("");
	const [desc, setDesc] = useState("Repeat Password");
	const [emailDesc, setEmailDesc] = useState("Email");
	const [emailErr, setEmailErr] = useState(false);

	const validateEmail = (e) => {
		if (e.target.value != pass) {
			// Set the password repeat message
			setDesc("Passwords must match!");
			// Set the error state
			setError(true);
		} else {
			// Set the password repeat message
			setDesc("Password Matches! Thank you!");
			// Set the error state
			setError(false);
		}
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePass = (e) => {
		setPass(e.target.value);
	};

	const handleRePass = (e) => {
		setRePass(e.target.value);
		validateEmail(e);
	};

	const handleSubmit = () => {
		if (!EmailCheck(email)) {
			setEmailErr(true);
			setEmailDesc("Invalid Email! Please try again...");
		} else if (rePass !== pass) {
			alert("Passwords do not match!");
		} else {
			console.log("dud");
			firebase.auth().createUserWithEmailAndPassword(email, pass).catch((error) => {
				console.log("ERROR::: " + error);
				alert("Could not create user :(");
			}).finally(() => {
				Router.push({
					pathname: "/auth",
				});
			});
		}
	};

	return (
		<Box className={classes.outerBox}>
			<Grid container justify="center" style={{ marginTop: "84px" }}>
				<Grid item xs={12} sm={6} lg={4}>
					<Card className="reg-login">
						<CardContent>
							<Typography variant="h4">Register</Typography>
							<form>
								<TextField error={emailErr} value={email} label={emailDesc} onChange={handleEmail} />
								<TextField
									value={pass}
									label="Password"
									type="Password"
									onChange={handlePass}
								/>
								<TextField
									value={rePass}
									error={error}
									label={desc}
									type="Password"
									onChange={handleRePass}

								/>
								<Button
									color="primary"
									variant="contained"
									onClick={handleSubmit}>
									Register
								</Button>
							</form>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}
export default withStyles(styles(theme))(RegistrationPage);
