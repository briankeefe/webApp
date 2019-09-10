import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Link from "next/link";
import { white } from "ansi-colors";
import * as firebase from "firebase";
import firebaseConfig from "../../config/firebaseConfig";
import Router from "next/router";
const theme = createMuiTheme({
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
});

function layout(classes) {
	return (
		<Box mb={10}>
			<Head>
				<title>My page title</title>
				<meta
					name="viewport"
					content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
				/>
			</Head>
			<CssBaseline />
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Typography variant="h4">Flash Card Maker</Typography>
					<Box mr={5} style={{ position: "absolute", right: 0 }}>
						<Link href="/study">
							<Button variant="contained">Study</Button>
						</Link>
						<Link href="/tables">
							<Button variant="contained">Tables</Button>
						</Link>
						<Link href="/cards">
							<Button variant="contained">Cards</Button>
						</Link>
						<Link href="/">
							<Button variant="contained">Add</Button>
						</Link>
						<Link href="/cards">
							<Button variant="contained">Auth</Button>
						</Link>
						<Button onClick={()=> {
							console.log("Register Button Clicked");
							Router.push("/auth");
						}} variant="contained">Register</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default withStyles(styles(theme))(layout);
