/**
 * External dependencies
 */
import { Icon, chevronLeftSmall } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import Link from "next/link";

export default function HomeLink() {
	return (
		<Link href="/" className="home-link" target="_blank">
			<Icon icon={chevronLeftSmall} /> Home
		</Link>
	);
}
