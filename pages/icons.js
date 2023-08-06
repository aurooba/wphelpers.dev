/**
 * External Dependencies
 */
import React from "react";
import { NextSeo } from "next-seo";
/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import IconGrid from "@components/IconGrid";
import HomeLink from "@components/HomeLink";
import SkipLink from "@components/SkipLink";

export default function Icons() {
	return (
		<>
			<NextSeo
				title="WordPress Icon Library"
				description="A searchable guide to the complete #WordPress icon library from Gutenberg."
				openGraph={{
					url: "https://wphelpers.dev/icons",
					title: "WordPress Icon Library",
					description:
						"A searchable guide to the complete #WordPress icon library from Gutenberg.",
					images: [
						{
							url: "https://wphelpers.dev/og-image-icon-explorer.png",
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
			<SkipLink href="#icon-card" />
			<div className="container">
				<main>
					<HomeLink />
					<IconGrid />
				</main>

				<Footer />
			</div>
		</>
	);
}