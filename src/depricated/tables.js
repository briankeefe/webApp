import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box } from "@material-ui/core";
import Layout from "../universal/layout";
import { white } from "ansi-colors";
import * as firebase from "firebase";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from "next/router";
import Launch from "../universal/launchFirebase";
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

function TablesPage(props) {
	const { classes } = props;
	Launch();
	let running = firebase.apps.length;
	let s = running === 1 ? "FIREBASE RUNNING" : "FIREBASE NOT RUNNING";
	const [user, loading, error] = useAuthState(firebase.auth());
	console.log(s);
	useEffect(() => {
		console.log("TABLE PAGE");
		if (user !== null && user.email !== null) {
			user.getIdToken().then((obj) => {
				console.log(obj);
			});
		} else {
			console.log("No user yet...");
			Router.push({
				pathname: "/auth",
				query: { fail: true }
			});
		}
		
	}, []);

	return (
		<Box className={classes.outerBox}>
			<Box pl={2}>
				<Typography style={{ color: "white" }} variant="h4">
					Authenticated Tables Page
				</Typography>
			</Box>
		</Box>
	);
}
export default withStyles(styles(theme))(TablesPage);
