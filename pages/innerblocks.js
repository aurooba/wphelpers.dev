/**
 * External Dependencies
 */
import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import InnerBlocksGenerator from "@components/innerblocks/InnerBlocksGenerator";

export default function Icons() {
	const [blocksObject, setBlocksObject] = useState({});
	useEffect(() => {
		fetch("/api/core-blocks")
			.then(async (response) => response.json())
			.then((response) => {
				setBlocksObject(response);
			})
			.catch((error) => {
				console.log("error: " + error);
			});
	}, []);

	return (
		<div className="page">
			<NextSeo
				title="WordPress InnerBlocks Template Generator"
				description="Build your InnerBlocks visually."
				openGraph={{
					url: "https://wphelpers.dev/icons",
					title: "WordPress InnerBlocks Template Generator",
					description: "Build your InnerBlocks visually.",
					images: [
						{
							url: "https://wphelpers.dev/og-image-innerblocks-generator.png",
							width: 1200,
							height: 675,
							alt: "An image with the title and description of the website",
							type: "image/png",
						},
					],
					siteName: "wphelpers.dev",
				}}
				twitter={{
					cardType: "summary_large_image",
				}}
			/>

			<main>
				<header className="innerblocks-header">
					<h1>WordPress InnerBlocks Template Generator</h1>
					<p>Generate InnerBlocks templates in JSX or PHP.</p>
				</header>
				{Object.keys(blocksObject).length !== 0 && (
					<InnerBlocksGenerator blocksObject={blocksObject} />
				)}
			</main>

			<Footer />
		</div>
	);
}
