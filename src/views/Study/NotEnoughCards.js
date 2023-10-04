import React from 'react';

function NotEnoughCards() {
	return (
		<>
			<h2 className='h2'>Not enough cards.</h2>
			<p>You need at least 3 cards to study. There are 2 cards in this deck.</p>
			<button className='btn btn-primary'>Add Cards</button>
		</>
	);
}

export default NotEnoughCards;
