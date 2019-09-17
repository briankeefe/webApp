import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box, Paper, Card, TextField, Button, Grid, CardContent } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import EmailCheck from "../src/logic/EmailCheck.js";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

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
		if(!EmailCheck(email)){
			setEmailErr(true);
			setEmailDesc("Invalid Email! Please try again...");
		}else{
			setEmailErr(false);
			setEmailDesc("Valid Email! Thank you!");
		}	
	};

	return (
		<Box className={classes.outerBox}>
			<Box mt={10}>
				<Typography variant="h3" style={{ color: "white" }}>This is the registration page</Typography>
			</Box>
			<Grid container justify="center">
				<Grid item xs={12} sm={6} lg={4}>
					<Card className="reg-login">
						<CardContent>
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
									Log In
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
