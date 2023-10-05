import React from 'react';
import { Link, useParams } from 'react-router-dom';

function NotEnoughCards() {
	const {deckId} = useParams()
		return (
		<>
			<h2 className='h2'>Not enough cards.</h2>
			<p>You need at least 3 cards to study. There are 2 cards in this deck.</p>
			<Link
				to={`/decks/${deckId}/cards/new`}
				className='btn btn-primary'
			>
				Add Cards
			</Link>
		</>
	);
}

export default NotEnoughCards;
