import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import {
	createMuiTheme,
	Typography,
	Box,
	Card,
	CardContent,
	Button,
	CardActionArea,
	CardActions,
	Grid,
} from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import { theme, backgroundColor } from "../src/universal/theme";
import { useEffect, useState } from "react";
import { pullCards } from "../src/universal/pullCards";
import { useAuthState } from "react-firebase-hooks/auth";
import * as firebase from "firebase";
import Router from "next/router";
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
	paper: {
		minHeight: "15vh",
	},
});

const printCard = (word, def, show, setShow) => {
	const clickFunc = () => {
		setShow(!show);
	};
	console.log("Printing card...");

	if (show) {
		return (
			<Card>
				<CardContent>
					<Typography>{word}</Typography>
					<Button onClick={clickFunc}>Toggle</Button>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card>
				<CardContent>
					<Typography>{def}</Typography>
					<Button onClick={clickFunc}>Toggle</Button>
				</CardContent>
			</Card>
		);
	}
};

function StudyPage(props) {
	const { classes } = props;
	let arr = [];
	const [cards, cardSet] = useState(arr);
	const [user, loading, error] = useAuthState(firebase.auth());

	const emptyCard = {
		word: "no word",
		def: "no def",
	};

	const [show, setShow] = useState(false);
	const [pos, setPos] = useState(0);
	const [card, setCard] = useState(emptyCard);
	const [text, setText] = useState("Loading...");
	const [textType, setTextType] = useState("Loading...");
	const [buttonText, setButtonText] = useState("Loading...");
	const [showButton, setShowButton] = useState("");

	useEffect(() => {
		// Part 1: Redirect if not logged in
		console.log("TABLE PAGE");
		if (user !== null && user.email !== null) {
			console.log("User:" + user.email);
		} else {
			console.log("No user yet...");
			Router.push({
				pathname: "/auth",
				query: { fail: true },
			});
		}
		//Part 2: Get words if logged in
		try {
			pullCards(user, cardSet);
		} catch (error) {
			console.log("ERROR: " + error);
		}
	}, []);

	useEffect(() => {
		if (cards) {
			setCard(cards[pos]);
		}
	}, [cards, pos]);

	const posInc = () => {
		if (pos + 1 === cards.length) {
			setPos(0);
		} else {
			setPos(pos + 1);
		}
		console.log("POS: " + pos);
	};

	const posDec = () => {
		if (pos - 1 === -1) {
			setPos(cards.length - 1);
		} else {
			setPos(pos - 1);
		}
		console.log("POS: " + pos);
	};

	const toggle = () => {
		console.log("Setting to: " + !show);
		setShow(!show);
	};

	useEffect(() => {
		console.log("Text effect...");
		if (card && show) {
			setTextType("Definition");
			setText(card.def);
			setButtonText("HIDE");
			setShowButton("hidden");
		} else if (card) {
			setTextType("Word");
			setText(card.word);
			setButtonText("SHOW");
			setShowButton("visible");
		} else {
			console.log("No card");
		}
	}, [show, card]);

	if (card) {
		return (
			<Box className="study-box">
				<Grid container justify="center">
					<Grid item sm={12} md={6} lg={8}>
						<Card className="study-card">
							<Box>
								<Box
									className="study-outer"
									display="flex"
									mb={2}>
									<Box visibility={showButton} display="flex">
										<Button onClick={posDec}>Prev</Button>
									</Box>
									<Box className="card-button" display="flex">
										<Button
											className="study-button"
											onClick={toggle}>
											{buttonText}
										</Button>
									</Box>
									<Box
										visibility={showButton}
										className="next-box"
										display="flex">
										<Button onClick={posInc}>Next</Button>
									</Box>
								</Box>
								<CardContent>
									<Typography display="inline" variant="h5">
										<strong>{textType}:</strong>{" "}
									</Typography>
									<Typography display="inline" variant="h6">
										{text}
									</Typography>
								</CardContent>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Box>
		);
	} else {
		return (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);
	}
}
export default withStyles(styles(theme))(StudyPage);
