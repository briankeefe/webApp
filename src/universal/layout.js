import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import Link from "next/link";
import { white } from "ansi-colors";
import Router from "next/router";
import { blue, red } from "@material-ui/core/colors";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import { theme } from "../universal/theme";

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
});

function layout(classes) {
	return (
		<Box>
			<Head>
				<title>My page title</title>
				<meta
					name="viewport"
					content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
				/>
			</Head>
			<CssBaseline />
			<AppBar>
				<Toolbar variant="regular">
					<Typography variant="h4">Flash Card Maker</Typography>
					<Box mr={5} style={{ position: "absolute", right: 0 }}>
						<Link href="/study">
							<Button variant="contained">Study</Button>
						</Link>
						<Link href="/cards">
							<Button variant="contained">Cards</Button>
						</Link>
						<Link href="/">
							<Button variant="contained">Add</Button>
						</Link>
						<Link href="/auth">
							<Button variant="contained">Auth</Button>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default withStyles(styles(theme))(layout);
