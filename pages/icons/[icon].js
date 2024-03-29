/**
 * External Dependencies
 */
import { useRouter } from 'next/router';
import { NextSeo } from "next-seo";
/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import IconGrid from "@components/IconGrid";
import Header from "@components/Header";

export default function Icons() {
	const router = useRouter();
	const { icon } = router.query;

	return (
		<>
			<NextSeo
				title={`${icon} – WordPress Icon Library`}
				description="A searchable guide to the complete #WordPress icon library from Gutenberg."
				openGraph={{
					url: "https://wphelpers.dev/icons/" + icon,
					title: icon + " – WordPress Icon Library",
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
			<div className="container">
				<main>
					<Header />
					<IconGrid icon={icon} />
				</main>

				<Footer />
			</div>
		</>
	);
}