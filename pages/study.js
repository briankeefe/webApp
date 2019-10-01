import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box, Card, CardContent, Button } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import { theme, backgroundColor } from "../src/universal/theme";
import { useEffect, useState} from "react";
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
					<Typography>
						{word}
					</Typography>
					<Button onClick={clickFunc}>
						Toggle
					</Button>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card>
				<CardContent>
					<Typography>
						{def}
					</Typography>
					<Button onClick={clickFunc}>
						Toggle
					</Button>
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
	const [count, setCount] = useState(0);
	const countInc = () => {
		setCount(count + 1);
	};
	useEffect(() => {
		// Part 1: Redirect if not logged in
		console.log("TABLE PAGE");
		if (user !== null && user.email !== null) {
			user.getIdToken().then(obj => {
				console.log("User: " + user.email);
			});
		} else {
			console.log("No user yet...");
			Router.push({
				pathname: "/auth",
				query: { fail: true },
			});
		}

		//Part 2: Get words if logged in
		console.log("CONNECTING");
		try {
			pullCards(user, cardSet);
			console.log("CONNECTED");
		} catch (error) {
			countInc();
			console.log("ERROR: " + error);
		}
	}, []);

	const emptyCard = {
		word: "no word",
		def: "no def"
	};

	const [show, setShow] = useState(false);
	const [pos, setPos] = useState(0);
	const [card, setCard] = useState(emptyCard);

	useEffect(() => {
		setCard[cards[pos]];
	}, pos);


	const incPos = () => {
		setPos((pos + 1)%);
	};

	const decPos = () => {
		setPos(pos )
	}

	return (
		<Box className={classes.outerBox}>
			<Box style={{marginTop: "100px"}} pt={2} pl={2}>
				<Typography style={{ color: "white" }} variant="h4">
					Number of cards: {cards.length}
				</Typography>
				{
					card.def
				}
			</Box>
		</Box>
	);
}
export default withStyles(styles(theme))(StudyPage);
