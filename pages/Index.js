import Head from "next/head";
import React, { useState, useEffect, useLayoutEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import SkipNext from "@material-ui/icons/SkipNext.js";
import SkipPrev from "@material-ui/icons/SkipPrevious.js";
import {
	Toolbar,
	Typography,
	Box,
	createMuiTheme,
	Grid,
	TextField,
	Paper,
	Container,
	CssBaseline,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { teal, blue, white } from "@material-ui/core/colors/";
import Word from "../models/Word.js";
import { black } from "ansi-colors";
import Layout from "../src/universal/layout";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth } from "firebase";

const theme = createMuiTheme({
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	paper: {
		flexGrow: 1,
		backgroundColor: "#63a4ff",
	},
	appBar: {
		backgroundColor: blue[800],
		color: "white",
	},
	button: {
		marginTop: theme.spacing(3),
		margin: "auto",
	},
	buttonPaper: {
		padding: "1%",
	},
	cardBox: {
		backgroundColor: teal[500],
		padding: theme.spacing(3),
		margin: "auto",
	},
	white: {
		backgroundColor: "#ffffff",
	},
	submitPaper: {
		padding: theme.spacing(3),
	},
	outer: {
		minHeight: "20vh",
	},
	container: {
		minHeight: "100vh",
		backgroundColor: teal[500],
	},
});

function IndexPage(props) {
	const { classes } = props;
	let arr = [];
	const [cards, cardSet] = useState(arr);
	const [cur, curSet] = useState(0);
	const fetch = require("node-fetch");

	


	useEffect(() => {
		console.log("CONNECTING");
		async function fetchData() {
			// You can await here
			const response = await axios("http://localhost:3001/word");
			cardSet(response.data);
		}
		fetchData();
		console.log("CONNECTED");
	}, []);

	const curInc = num => {
		if (cur + 1 === cards.length) {
			curSet(0);
		} else {
			curSet(cur + 1);
		}
		console.log("curINC");
	};

	const curDec = num => {
		if (cur - 1 === -1) {
			curSet(cards.length - 1);
		} else {
			curSet(cur - 1);
		}
		console.log("curDEC");
	};

	const addingFunc = () => {
		let nextWord = new Word(
			document.getElementById("fieldOne").value,
			document.getElementById("definition").value,
			document.getElementById("fieldTwo").value
		);
		//TODO Add alert
		if (nextWord.word === "") {
			console.log("Invalid Word Name");
			return;
		}
		cardSet([nextWord].concat(cards));
		console.log(cards);
		fetch("http://localhost:3001/word", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				word: document.getElementById("fieldOne").value,
				pos: document.getElementById("fieldTwo").value,
				def: document.getElementById("definition").value,
			}),
		});
		console.log("end");
		document.getElementById("fieldOne").value = "";
		document.getElementById("definition").value = "";
		document.getElementById("fieldTwo").value = "";
	};

	const partOfSpeech = word => {
		if (word === "" || word === undefined) {
			return "";
		} else {
			return "Part of Speech: " + word;
		}
	};

	const SampleCard = (word, def, cur, pos) => (
		<Box my={5} className={classes.outer}>
			<Layout />
			<Grid justify="center" container>
				<Grid item xs={12} sm={6} md={4}>
					<Card className={classes.card}>
						<Button onClick={curDec}>Back</Button>
						<Button
							onClick={curInc}
							style={{
								display: "flex",
								float: "right",
							}}>
							Next
						</Button>
						<CardContent>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom>
								Word #{cur}
							</Typography>
							<Typography variant="h5" component="h2">
								{word}
							</Typography>
							<Typography
								className={classes.pos}
								color="textSecondary">
								{partOfSpeech(pos)}
							</Typography>
							<Typography variant="body2" component="p">
								{def}
								<br />
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Learn More</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);

	const PrintCard = () => {
		if (cards.length != 0) {
			if (cards[cur] == undefined) {
				return;
			}
			return SampleCard(
				cards[cur].word,
				cards[cur].def,
				cur + 1,
				cards[cur].pos
			);
		} else {
			return SampleCard("NULL", "NULL", 0, "NULL");
		}
	};

	return (
		<div className={classes.container}>
			<Box className={classes.cardBox}>
				<Box py={10} mx={2}>
					{PrintCard()}
				</Box>
			</Box>
			<Box className={classes.cardBox}>
				<Grid container justify="center">
					<Grid item xs={12} md={10} lg={8}>
						<Paper className={classes.submitPaper}>
							<Grid
								justify="center"
								className={classes.white}
								container
								spacing={1}>
								<Grid item xs={12} sm={4}>
									<TextField
										id="fieldOne"
										label="Word"
										placeholder="Enter a study word here"
										fullWidth
										margin="normal"
										variant="filled"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField
										id="fieldTwo"
										label="Part of Speech (Optional)"
										placeholder="Placeholder"
										fullWidth
										className={classes.textField}
										margin="normal"
										variant="filled"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Box>
										<TextField
											id="definition"
											label="Definition Goes Here"
											placeholder="More lines will appear as needed"
											multiline
											fullWidth
											className={classes.textField}
											margin="normal"
											variant="filled"
										/>
									</Box>
								</Grid>
								<Grid container justify="center">
									<Grid item xs={12} sm={4}>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											size="large"
											onClick={addingFunc}>
											Submit
										</Button>
									</Grid>
								</Grid>
								<Grid item sm={4} />
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default withStyles(styles(theme))(IndexPage);
