import React from 'react';

function TwoItemBreadcrumb({ deckName }) {

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
				<li
					className='breadcrumb-item active'
					aria-current='page'
				>
					{deckName}
				</li>
			</ol>
		</nav>
	);
}

export default TwoItemBreadcrumb;
