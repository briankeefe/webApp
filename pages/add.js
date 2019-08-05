import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { Typography, Box } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { teal } from "@material-ui/core/colors";

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
});

function AddPage(props) {
	const { classes } = props;
	return (
		<Box className={classes.cardBox} style={{ minHeight: "100vh" }}>
			<Layout />
			<Box
				style={{
					backgroundColor: "white",
					marginTop: "30vh",
					marginLeft: "auto",
					marginRight: "auto",
					width: "33vw",
					height: "33vh",
				}}
			/>
		</Box>
	);
}

export default withStyles(styles(theme))(AddPage);
