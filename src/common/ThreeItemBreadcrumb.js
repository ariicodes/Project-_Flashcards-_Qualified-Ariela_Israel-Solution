import React from 'react';

function ThreeItemBreadcrumb({ deckId, deckName, view }) {
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				<li className='breadcrumb-item'>
					<a
						href='/'
						onClick={handleReload}
					>
						Home
					</a>
				</li>
				<li className='breadcrumb-item'>
					<a href={`/decks/${deckId}`} onClick={handleReload}>{deckName}</a>
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
