import React from 'react';
import { Link } from 'react-router-dom';

function ThreeItemBreadcrumb({ deckId, deckName, view }) {
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				<li className='breadcrumb-item'>
					<Link to='/'>Home</Link>
				</li>
				<li className='breadcrumb-item'>
					<Link to={`/decks/${deckId}`}>{deckName}</Link>
				</li>
				<li
					className='breadcrumb-item active'
					aria-current='page'
				>
					{view}
				</li>
			</ol>
		</nav>
	);
}

export default ThreeItemBreadcrumb;
