import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme, Typography, Box } from "@material-ui/core";
import Layout from "../src/universal/layout";
import { white } from "ansi-colors";
import { theme, backgroundColor } from "../src/universal/theme";

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

function StudyPage(props) {
	const { classes } = props;
	return (
		<Box className={classes.outerBox}>
			<Box style={{marginTop: "100px"}} pt={2} pl={2}>
				<Typography style={{ color: "white" }} variant="h4">
					Template For Study Page
				</Typography>
			</Box>
		</Box>
	);
}
export default withStyles(styles(theme))(StudyPage);
