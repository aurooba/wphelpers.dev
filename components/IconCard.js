import { useState } from 'react';
import  * as icons from '@wordpress/icons';


export default function IconCard({icon}) {

	const [isCopied, setIsCopied] = useState(false);

	const importText = `import { Icon, ${icon} } from '@wordpress/icons';`;
	const iconText = `<Icon icon={${icon}} />`;

	console.log(icons[icon].props);

	async function handleCopyClick(text) {
		setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
		return await navigator.clipboard.writeText(text);
	}

	return (
		<div className="icon-card">
			
			<h2>{icon} <icons.Icon icon={ icons[icon] } size={64} /></h2>
			
			<button onClick={() => { handleCopyClick(importText)}}>
				<span className="visually-hidden">Click to copy</span>
				<pre>{importText}</pre>
			</button>
			<button onClick={() => { handleCopyClick(iconText)}}>
				<span className="visually-hidden">Click to copy</span>
				<pre>{iconText}</pre>
			</button>
			<button onClick={() => { handleCopyClick(icon)}}>
				<span className="visually-hidden">Click to copy</span>
				<pre>{icon}</pre>
			</button>
			{isCopied && <span className="copied">Copied!</span>}
		</div>
	)
}
