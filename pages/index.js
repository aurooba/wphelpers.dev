/**
 * External Dependencies
 */
import Head from "next/head";
import React, { useEffect, useState } from "react";

/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";

export default function Home() {
	const MINUTE_MS = 60000;
	const [latestWP, setLatestWP] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			fetch("/.netlify/functions/wp")
				.then(async (response) => response.json())
				.then((response) => {
					setLatestWP(response.version);
				})
				.catch((error) => {
					console.log("error: " + error);
				});
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);
	return (
		<div className="container">
			<Head>
				<title>
					The latest WordPress version is {latestWP ? latestWP : "5.9.1"}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<section class="main-feature">
					<p>The latest WordPress version is:</p>
					<h1 className="version">{latestWP ? latestWP : "5.9.1"}</h1>
				</section>
			</main>

			<Footer />
		</div>
	);
}
