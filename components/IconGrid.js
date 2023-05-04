import * as icons from '@wordpress/icons';
import IconPreview from './IconPreview';
import IconCard from './IconCard';
import { useState } from 'react';

export default function IconGrid({ icon="wordpress"}) {
	const [ search, setSearch ] = useState('');

	const handleSearch = (event) => {
		setSearch(event.target.value);
	}
	return (
		<>

			<header className="icons-header">

				<div className="icons-meta">
					<h1>WordPress Icons Library.</h1>
					<p>A searchable guide to the complete <a href="https://github.com/WordPress/gutenberg/tree/trunk/packages/icons" target="_blank">WordPress Icon Library</a> package from Gutenberg.</p>
					
					<input type="text" placeholder="Search" value={search} onChange={handleSearch} />
				</div>

				{ icon && <IconCard icon={icon} /> }

			</header>
			<section className="icons-grid">
				{
					Object.keys(icons).filter((icon)=>{ return search === '' || icon.toLowerCase().indexOf(search.toLowerCase()) > -1 }).map((icon, index) => {
						return  ( 'Icon' !== icon ) ? (
							<IconPreview icon={ icon } name={ icons[icon] } key={index} />
						) : null;
					}
				)}
			</section>

		</>
	)
}