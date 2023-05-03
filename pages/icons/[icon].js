/**
 * External Dependencies
 */
import Head from "next/head";
import { useRouter } from 'next/router';

/**
 * Internal Dependencies
 */
import Footer from "@components/Footer";
import IconGrid from "@components/IconGrid";




export default function Icons() {

	const router = useRouter()
	const { icon } = router.query;

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
				<IconGrid icon={icon} />
			</main>

			<Footer />
		</div>
	);
}