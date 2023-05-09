/**
 * External Dependencies
 */
import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import BlockCard from "@components/BlockCard";
import HomeLink from "@components/HomeLink";
import SkipLink from "@components/SkipLink";

export default function Blocks() {
	const router = useRouter();
	const { block: setBlock, s: searchQuery } = router.query;
	console.log(searchQuery);
	const [blocksObject, setBlocksObject] = useState({});
	const [search, setSearch] = useState(
		"" !== searchQuery && undefined !== searchQuery ? searchQuery : "",
	);
	const [blocksFound, setBlocksFound] = useState(blocksObject.length);
	const [showBlockProps, setShowBlockProps] = useState(
		undefined !== setBlock ? setBlock[0] : false,
	);
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
		setShowBlockProps(undefined !== setBlock ? setBlock[0] : false);
	}, [setBlock]);

	useEffect(() => {
		setSearch(
			"" !== searchQuery && undefined !== searchQuery ? searchQuery : "",
		);
	}, [searchQuery]);

	useEffect(() => {
		setBlocksFound(
			Object.keys(blocksObject).filter((block) => {
				return "" !== search ? filterBlocksBySearch(block) : true;
			}).length,
		);
	}, [search, blocksObject]);
	function handleSearch(event) {
		setSearch(event.target.value);
		let query = { ...router.query, s: event.target.value };
		if ("" === event.target.value) {
			delete query.s;
		}

		router.push(
			{
				query,
			},
			undefined,
			{
				...router.options,
				shallow: true,
			},
		);
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
			<SkipLink href="#block-reference-grid" />
			<NextSeo
				title="WordPress Core Blocks Explorer"
				description="A searchable explorer to the all the WordPress core blocks and their properties."
				openGraph={{
					url: "https://wphelpers.dev/blocks",
					title: "WordPress Core Blocks Explorer",
					description:
						"A searchable explorer to the all the WordPress core blocks and their properties.",
					images: [
						{
							url: "https://wphelpers.dev/og-image-blocks-explorer.png",
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
				<HomeLink />
				<header className="blocks-header">
					<h1>WordPress Core Blocks Explorer</h1>
					<p className="smaller-paragraph">
						Explore all the WordPress core blocks and their properties.
					</p>
					<p className="smaller-paragraph">
						Note: All the information is pulled from the latest stable release
						of the{" "}
						<a href="https://github.com/WordPress/gutenberg">Gutenberg</a>{" "}
						package{" "}
						<a href="https://www.npmjs.com/package/@wordpress/block-library">
							@wordpress/block-library
						</a>
						.
					</p>
				</header>
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
				{Object.keys(blocksObject).length === 0 && (
					<div className="loading-blocks">Loading blocks...</div>
				)}
				<div id="block-reference-grid" className="blocks-reference-grid">
					{Object.keys(blocksObject)
						.filter((block) => {
							return "" !== search ? filterBlocksBySearch(block) : true;
						})
						.map((block) => {
							return (
								<BlockCard
									key={"grid-item-" + block}
									blockObject={blocksObject[block]["block"]}
									showBlockProps={showBlockProps}
									blockName={block}
									setShowBlockProps={setShowBlockProps}
								/>
							);
						})}
				</div>
			</main>
			<Footer />
		</div>
	);
}
