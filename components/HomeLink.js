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
		<div className="home-link">
			<Link href="/">
				<Icon icon={chevronLeftSmall} /> Home
			</Link>
		</div>
	);
}
