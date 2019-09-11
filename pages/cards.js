import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { Typography, Box, Grid, Paper, Container } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { teal } from "@material-ui/core/colors";
import { Word } from "../models/Word";
import React, { useState, useEffect } from "react";
import axios from "axios";

const theme = createMuiTheme({
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	cardBox: {
		backgroundColor: teal[500],
		padding: theme.spacing(3),
		margin: "auto",
	},
	paper: {
		height: "20vh",
	},
});

function CardsPage(props) {
	const { classes } = props;
	let arr = [];
	const [cards, cardSet] = useState(arr);
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

	const partOfSpeech = word => {
		if (word === "" || word === undefined) {
			return "";
		} else {
			return "Part of Speech: " + word;
		}
	};

	const ShowCard = word => (
		<Paper className={classes.paper}>
			<Box className="show-card-box" p={2}>
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
				<Box>
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
