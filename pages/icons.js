/**
 * External Dependencies
 */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import * as icons from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import IconCard from "@components/IconCard";




export default function Icons() {

	const [ search, setSearch ] = useState('');

	const handleSearch = (event) => {
		setSearch(event.target.value);
	}

	return(
		<div className="container">
			<Head>
				<title>WordPress Icons Library.</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="Displays the latest WordPress Icons Library package."></meta>
				<meta
					property="og:title"
					content={`WordPress Icons Library.`}
					key="ogtitle"
				/>
				<meta
					property="og:description"
					content="Displays the latest WordPress Icons Library package."
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
					content={`WordPress Icons Library.`}
					key="ogsitename"
				/>
				<meta
					property="og:title"
					content={`WordPress Icons Library.`}
					key="ogtitle"
				/>
				<meta
					property="og:description"
					content="Displays the latest WordPress Icons Library package."
					key="ogdesc"
				/>
			</Head>

			<main>
				<header className="icons-header">
					<h1>WordPress Icons Library.</h1>
					<p>A searchable guide to the complete <a href="https://github.com/WordPress/gutenberg/tree/trunk/packages/icons" target="_blank">WordPress Icon Library</a> package from Gutenberg. Click the icon to copy the code.</p>
					<input type="text" placeholder="Search" value={search} onChange={handleSearch} />
				</header>
				<section className="icons-feature">
					{
						Object.keys(icons).filter((icon)=>{ return search === '' || icon.toLowerCase().indexOf(search.toLowerCase()) > -1 }).map((icon, index) => {
							return  ( 'Icon' !== icon ) ? (
								<IconCard icon={icon} key={index} />
							) : null;
						}
					)}
				</section>
			</main>

			<Footer />
		</div>
	);
}