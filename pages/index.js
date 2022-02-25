import Head from "next/head";
import Footer from "@components/Footer";

export default function Home() {
	const latestWP = "";
	return (
		<div className="container">
			<Head>
				<title>The latest WordPress version is {latestWP}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main></main>

			<Footer />
		</div>
	);
}
