import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
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
	return (
		<Box className={classes.outerBox}>
			<Layout />
			<Box pt={10} pl={2}>
				<Typography style={{ color: "white" }} variant="h4">
                    Template For Table Page
				</Typography>
			</Box>
		</Box>
	);
}
export default withStyles(styles(theme))(TablesPage);
