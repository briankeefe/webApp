import { useState } from "react";
import { Typography } from "@material-ui/core";
import { Button, Box, Card, CardContent } from "@material-ui/core";

export default (word, def, show, setShow) => {
	const clickFunc = () => {
		setShow(!show);
	};
	console.log("Printing card...");
	const button = () => {
		<Box>
			<Button onClick={clickFunc}>
                Show
			</Button>
		</Box>;
	};

	if (show) {
		return (
			<Box mt={10}>
				<Box mt={10}/>
				<Card>
					<CardContent>
						<Typography>
							{word}
						</Typography>
						{button}
					</CardContent>
				</Card>
			</Box>
		);
	} else {
		return (
			<Box mt={10}>
				<Box mt={10}/>
				<Card>
					<CardContent>
						<Typography>
							{def}
						</Typography>
						{button}
					</CardContent>
				</Card>
			</Box>
		);
	}
};