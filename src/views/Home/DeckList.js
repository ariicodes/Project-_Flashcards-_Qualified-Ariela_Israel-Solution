import React from 'react';
import { Link } from 'react-router-dom';
import { cardCount } from '../../helpers';

function DeckList({ cards, decks, handleDeckDelete }) {
	const decksList = decks.map(deck => (
		<div
			className='card'
			key={deck.id}
		>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h5 className='card-title'>{deck.name}</h5>
					<p>{cardCount(cards, deck.id)} cards</p>
				</div>
				<p className='card-text'>{deck.description}</p>
				<div className='d-flex justify-content-between'>
					<div>
						<Link
							to={`/decks/${deck.id}`}
							className='btn btn-secondary btn-1'
						>
							View
						</Link>
						<Link
							to={`/decks/${deck.id}/study`}
							className='btn btn-primary'
						>
							Study
						</Link>
					</div>
					<button
						onClick={() => handleDeckDelete(deck.id)}
						className='btn btn-danger'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	));

	return decksList;
}

export default DeckList;
