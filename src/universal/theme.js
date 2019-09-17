import { createMuiTheme } from "@material-ui/core";
import { red, blue, pink, indigo } from "@material-ui/core/colors";

export const theme = createMuiTheme({
	palette: {
		primary: red,
		secondary: pink,
	},
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
	
});

export default theme;