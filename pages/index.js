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
	const DELAY = 60000;
	const [latestWP, setLatestWP] = useState("");
	function versionCheck() {
		fetch("/.netlify/functions/wp")
			.then(async (response) => response.json())
			.then((response) => {
				setLatestWP(response.version);
			})
			.catch((error) => {
				console.log("error: " + error);
			});
	}
	useEffect(() => {
		versionCheck();
		const interval = setInterval(() => {
			versionCheck();
		}, DELAY);

		return () => clearInterval(interval);
	}, []);
	return (
		<div className="container">
			<Head>
				<title>The latest WordPress version is {latestWP}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="Displays the latest WordPress version available."></meta>
				<meta
					property="og:title"
					content={`The latest WordPress version is ${latestWP}`}
					key="ogtitle"
				/>
				<meta
					property="og:description"
					content="Displays the latest WordPress version available."
					key="ogdesc"
				/>
				{/* Twitter */}
				<meta name="twitter:card" content="summary" key="twcard" />
				<meta name="twitter:creator" content="@aurooba" key="twhandle" />

				{/* Open Graph */}
				<meta property="og:url" content="https://www.latestwp.is" key="ogurl" />
				<meta property="og:image" content="/latestwpis.png" key="ogimage" />
				<meta
					property="og:site_name"
					content={`The latest WordPress version is ${latestWP}`}
					key="ogsitename"
				/>
				<meta
					property="og:title"
					content={`The latest WordPress version is ${latestWP}`}
					key="ogtitle"
				/>
				<meta
					property="og:description"
					content="Displays the latest WordPress version available."
					key="ogdesc"
				/>
			</Head>

			<main>
				<section class="main-feature">
					<p>The latest WordPress version is:</p>
					<h1 className="version">{latestWP}</h1>
				</section>
			</main>

			<Footer />
		</div>
	);
}
