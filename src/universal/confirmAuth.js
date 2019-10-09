import Router from "next/router";

export const confirmAuth = user => {
	if (user !== null && user.email !== null) {
		console.log("User:" + user.email);
	} else {
		console.log("No user yet...");
		Router.push({
			pathname: "/auth",
			query: { fail: true },
		});
	}
};