import React from "react";
import App from "next/app";
import { Box } from "@material-ui/core";
import Layout from "../src/universal/layout";
import * as firebase from "firebase";
import firebaseConfig from "../config/firebaseConfig";
import Launch from "../src/universal/launchFirebase";
import "../css/style.scss";
import theme from "../src/universal/theme";
import { ThemeProvider } from "@material-ui/styles";


class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		Launch();
		return (
			<ThemeProvider theme={theme}>
				<Layout />
				<Component {...pageProps} />
			</ThemeProvider>
		);
	}
}

export default MyApp;