import { useState } from 'react';
import  * as icons from '@wordpress/icons';


export default function IconCard({icon}) {

	const [isCopied, setIsCopied] = useState(false);

	const copyText = `import { Icon, ${icon} } from '@wordpress/icons';\n\n<Icon icon={${icon}} />`;

	async function handleCopyClick(copyText) {
		setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
		return await navigator.clipboard.writeText(copyText);
	}

	return (
		<div className="icon-card">
			<button onClick={() => { handleCopyClick(copyText)}}>
				<icons.Icon icon={ icons[icon] } size={64} />
			</button>
			<pre>{copyText}</pre>
			<span>{icon}{" "} 
				<button onClick={() => { handleCopyClick(copyText)}}>
					{ isCopied ? (
						<>
							<icons.Icon icon={icons.check} size={16} />
							<span className="visually-hidden">Click to copy</span>
						</>
					) : <icons.Icon icon={icons.copy} size={16} /> }
					
				</button>
			</span>
		</div>
	)
}
