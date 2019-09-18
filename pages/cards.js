import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { Typography, Box, Grid, Paper, Container } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { teal } from "@material-ui/core/colors";
import { Word } from "../models/Word";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from "next/router";
import { theme, backgroundColor} from "../src/universal/theme";

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	cardBox: {
		backgroundColor: backgroundColor,
		padding: theme.spacing(3),
		margin: "auto",
	},
	paper: {
		height: "20vh",
	},
});

const sleep = (milliseconds) => {
	console.log("SLEEPING FOR "+ milliseconds + " milliseconds.");
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};

function CardsPage(props) {
	const { classes } = props;
	let arr = [];
	const [cards, cardSet] = useState(arr);
	const [user, loading, error] = useAuthState(firebase.auth());
	const [count, setCount] = useState(0);
	const countInc = () => {
		setCount(count + 1);
	};
	useEffect(() => {
		console.log("TABLE PAGE");
		if (user !== null && user.email !== null) {
			user.getIdToken().then((obj) => {
				console.log("User: " + user.email);
			});
		} else {
			console.log("No user yet...");
			Router.push({
				pathname: "/auth",
				query: { fail: true }
			});
		}

	}, []);
	useEffect(() => {
		console.log("CONNECTING");
		async function fetchData() {
			// You can await here
			console.log("BEFORE SLEEP");
			let id = await sleep(100).then(() => {
				for(let i = 0; i < 3; ++i){
					try{
						return user.email;
					}catch(error){
						console.log("Trying again");
						sleep(500);
					}
				}
			});
			console.log("AFTER SLEEP");
			console.log("ID: " + id);
			const params = new URLSearchParams();
			params.append("usr", id);
			axios("http://localhost:3001/userWords", { params: { usr: id } }).then((response) => {
				cardSet(response.data);
				console.log(response);
			}).catch((error) => {
				console.log(error);
			});
		}

		try {
			fetchData();
			console.log("CONNECTED");
		} catch (error) {
			countInc();
			console.log("ERROR: " + error);
		}

	},[]);

	const partOfSpeech = word => {
		if (word === "" || word === undefined) {
			return "";
		} else {
			return "Part of Speech: " + word;
		}
	};

	const ShowCard = word => (
		<Paper className={classes.paper}>
			<Box className="show-card-box" p={3}>
				<Typography variant="h5">
					<strong>Word: {word.word}</strong>
				</Typography>
				<Typography>{partOfSpeech(word.pos)}</Typography>
				<Typography>Definition: {word.def}</Typography>
			</Box>
		</Paper>
	);

	return (
		<Box className={classes.cardBox} style={{ minHeight: "100vh" }}>
			<Container>
				<Box className="card-page">
					<Grid container spacing={2}>
						{cards.map(word => (
							<Grid item xs={12} sm={6} md={3}>
								<Typography style={{ color: "white" }}>
									{ShowCard(word)}
								</Typography>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Box>
	);
}

export default withStyles(styles(theme))(CardsPage);
