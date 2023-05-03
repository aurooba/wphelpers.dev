
import  * as icons from '@wordpress/icons';
import Link from 'next/link';


export default function IconPreview({icon, name}) {
	console.log(icon);

	return (
		<div className="icon-card">	
			<Link href={`/icons/${encodeURIComponent(icon)}`}><icons.Icon icon={ name } size={64} /></Link>
			<span>
				<Link href={`/icons/${encodeURIComponent(icon)}`}>{icon}</Link>
			</span>
		</div>
	)
}
