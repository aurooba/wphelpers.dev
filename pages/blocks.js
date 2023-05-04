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

export default function Blocks() {
	const [blocksObject, setBlocksObject] = useState({});
	const [search, setSearch] = useState("");
	const [blocksFound, setBlocksFound] = useState(blocksObject.length);

	function filterBlocksBySearch(block) {
		const keywords = blocksObject[block]["block"].keywords;
		const category = blocksObject[block]["block"].category;
		const keywordSearch =
			"" !== search && Array.isArray(keywords)
				? keywords.includes(search.toLowerCase())
				: false;
		const categorySearch =
			"" !== search ? category.includes(search.toLowerCase()) : false;
		const blockSearch = blocksObject[block]["block"].name
			.toLowerCase()
			.includes(search.toLowerCase());
		let showBlock =
			blockSearch || keywordSearch || categorySearch ? true : false;
		return showBlock;
	}

	useEffect(() => {
		setBlocksFound(
			Object.keys(blocksObject).filter((block) => {
				return "" !== search ? filterBlocksBySearch(block) : true;
			}).length,
		);
	}, [search, blocksObject]);
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
		<div className="blocks-reference-page">
			<Head>
				<title>WordPress Core Blocks Referece</title>
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
				<div className="search-bar">
					<input
						type="text"
						placeholder="Search by block name, keyword, or category."
						value={search}
						onChange={handleSearch}
						className="search-input"
					/>
					{"" !== search && (
						<div className="blocks-found-quantity">
							{1 === blocksFound
								? "1 block found."
								: `${blocksFound} blocks found.`}
						</div>
					)}
				</div>
				{blocksObject.length === 0 && (
					<div className="loading-blocks">Loading blocks...</div>
				)}
				<div className="blocks-reference-grid">
					{Object.keys(blocksObject)
						.filter((block) => {
							return "" !== search ? filterBlocksBySearch(block) : true;
						})
						.map((block) => {
							return (
								<BlockReference
									key={"grid-item-" + block}
									block={blocksObject[block]["block"]}
								/>
							);
						})}
				</div>
			</main>

			<Footer />
		</div>
	);
}
