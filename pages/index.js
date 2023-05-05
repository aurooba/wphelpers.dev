/**
 * External Dependencies
 */
import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";

export default function Home() {
	const DELAY = 30000;
	const [latestWP, setLatestWP] = useState("");
	function versionCheck() {
		fetch("/api/wp")
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
		<>
			<NextSeo
				title="wphelpers.dev"
				description="a collection of helpers and explorers for WordPress developers and designers."
				openGraph={{
					url: "https://wphelpers.dev",
					title: "wphelpers.dev",
					description:
						"a collection of helpers and explorers for WordPress developers and designers.",
					images: [
						{
							url: "https://wphelpers.dev/og-image.png",
							width: 1200,
							height: 675,
							alt: "An image with the title and description of the website",
							type: "image/png",
						},
					],
					siteName: "wphelpers.dev",
				}}
				twitter={{
					handle: "@aurooba",
					cardType: "summary_large_image",
				}}
			/>
			<div className="container">
				<main>
					<section className="main-feature">
						<p>The latest WordPress version is:</p>
						<h1 className="version">{latestWP}</h1>
						<br />
						<br />
						<h2 className="smaller-paragraph">WordPress Icon Library</h2>
						<p className="smaller-paragraph">
							A searchable guide to the complete{" "}
							<a href="/icons">WordPress Icon Library</a> package from
							Gutenberg.
						</p>

						<h2 className="smaller-paragraph">
							WordPress Core Blocks Explorer
						</h2>
						<p className="smaller-paragraph">
							A searchable guide to all the{" "}
							<a href="/blocks">WordPress Core Blocks</a> for the Block Editor
							and their properties.
						</p>
						<p className="smaller-paragraph">
							Or get a complete{" "}
							<a href="/api/core-blocks">JSON object of all the core blocks</a>{" "}
							and their properties instead.
						</p>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
}
