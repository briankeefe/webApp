import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import * as firebase from "firebase";
import react, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
	const [user, loading, error] = useAuthState(firebase.auth());
	useEffect(() => {
		let running = firebase.apps.length;
		let s = running === 1 ? "FIREBASE RUNNING" : "FIREBASE NOT RUNNING";
		console.log(s);
		if (running) {
			console.log(user.email);
		}
	});

	return (
		<Box className={classes.outerBox}>
			<Layout />
			<Box pl={2}>
				<Typography style={{ color: "white" }} variant="h4">
					Template For Table Page
				</Typography>
			</Box>
		</Box>
	);
}
export default withStyles(styles(theme))(TablesPage);
