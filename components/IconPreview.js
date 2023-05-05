
import  * as icons from '@wordpress/icons';
import Link from 'next/link';
import { forwardRef } from "react";


export default function IconPreview({icon, name}) {
	const IconComponent = forwardRef(function IconComponent(props, ref) {
		return <icons.Icon icon={name} size={64} />;
	});
	return (
		<div className="icon-card">
			<Link href={`/icons/${encodeURIComponent(icon)}`}>
				<IconComponent />
			</Link>
			<span>
				<Link href={`/icons/${encodeURIComponent(icon)}`}>{icon}</Link>
			</span>
		</div>
	);
}
