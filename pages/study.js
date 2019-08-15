import { withStyles } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";
import Layout from "../src/universal/layout";
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
		minHeight: "15vh",
	},
});

function StudyPage(props) {
	const { classes } = props;
	return (
		<Box>
			<Layout />
		</Box>
	);
}
export default withStyles(styles(theme))(StudyPage);
