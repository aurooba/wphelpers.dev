/**
 * External Dependencies
 */
import Head from "next/head";
import React, { useState, useEffect } from "react";

/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import BlockReference from "@components/BlockReference";

export default function Icons() {
	const [blocksObject, setBlocksObject] = useState({});
	const [search, setSearch] = useState("");
	function handleSearch(event) {
		setSearch(event.target.value);
	}
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
		<div className="">
			<Head>
				<title>WordPress Icons Library.</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="WordPress Core Blocks and their information."></meta>
				<meta
					property="og:title"
					content={`WordPress Core Blocks Reference.`}
					key="ogtitle"
				/>
				<meta
					property="og:description"
					content="WordPress Core Blocks and their information."
					key="ogdesc"
				/>
				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" key="twcard" />
				<meta name="twitter:creator" content="@aurooba" key="twhandle" />

				{/* Open Graph */}
				<meta property="og:url" content="https://latestwp.is" key="ogurl" />
				<meta
					property="og:image"
					content="https://latestwp.is/latestwpis.png"
					key="ogimage"
				/>
				<meta
					property="og:site_name"
					content={`WordPress Core Blocks Reference.`}
					key="ogsitename"
				/>
				<meta
					property="og:title"
					content={`WordPress Core Blocks Reference.`}
					key="ogtitle"
				/>
				<meta
					property="og:description"
					content="WordPress Core Blocks and their information."
					key="ogdesc"
				/>
			</Head>

			<main>
				<input
					type="text"
					placeholder="Search"
					value={search}
					onChange={handleSearch}
				/>
				<div className="blocks-reference-grid">
					{Object.keys(blocksObject)
						.filter((block) => {
							return block.toLowerCase().includes(search.toLowerCase());
						})
						.map((block) => {
							return <BlockReference block={blocksObject[block]["block"]} />;
						})}
				</div>
			</main>

			<Footer />
		</div>
	);
}
