import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { confirmAuth } from "../src/universal/confirmAuth";
import { useAuthState } from "react-firebase-hooks/auth/dist/auth";
import * as firebase from "firebase";

function AddPage() {
	const [user, loading, error] = useAuthState(firebase.auth());
	useEffect(() => {
		confirmAuth();
	});

	return (
		<Box className="add-page">
			<Typography>Loading...</Typography>
		</Box>
	);
}

export default AddPage;
