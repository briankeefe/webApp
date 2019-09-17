import { createMuiTheme } from "@material-ui/core";
import { red, blue, pink, indigo, blueGrey } from "@material-ui/core/colors";

export const theme = createMuiTheme({
	palette: {
		primary: red,
		secondary: blue,
	},
	spacing: factor => [0, 4, 8, 16, 32, 64][factor],
	
});

export const backgroundColor = blueGrey[100];

export default theme;