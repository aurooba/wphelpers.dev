import "@styles/globals.scss";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as Fathom from "fathom-client";

function Application({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		Fathom.load("JALFHTEN", {
			includedDomains: ["wphelpers.dev"],
		});

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}
		// Record a pageview when route changes
		router.events.on("routeChangeComplete", onRouteChangeComplete);

		// Unassign event listener
		return () => {
			router.events.off("routeChangeComplete", onRouteChangeComplete);
		};
	}, []);

	return <Component {...pageProps} />;
}

export default Application;
