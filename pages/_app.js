import React from "react";
import App from "next/app";
import { Box } from "@material-ui/core";
import Layout from "../src/universal/layout";
import * as firebase from "firebase";
import firebaseConfig from "../config/firebaseConfig";
import Launch from "../src/universal/launchFirebase";
import "../css/style.scss";

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		Launch();
		return (
			<Box>
				<Layout />
				<Component {...pageProps} />
			</Box>
		);
	}
}

export default MyApp;