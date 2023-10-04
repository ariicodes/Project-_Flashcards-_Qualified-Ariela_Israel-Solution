import React from 'react';
import TwoItemBreadcrumb from '../../common/TwoItemBreadcrumb';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import CardList from './CardList';

function DeckContent({ deck, cards, deckId, handleDeckDelete }) {
	return (
		<>
			<TwoItemBreadcrumb deckName={deck.name} />
			<div className='mb-4'>
				<h4>{deck.name}</h4>
				<p>{deck.description}</p>
				<div className='d-flex justify-content-between'>
					<div className='d-flex'>
						<Link
							to={`/decks/${deckId}/edit`}
							className='btn btn-secondary btn-1'
						>
							Edit
						</Link>
						<button className='btn btn-primary btn-1'>Study</button>
						<button className='btn btn-primary'>Add Cards</button>
					</div>
					<button
						onClick={() => handleDeckDelete(deck.id)}
						className='btn btn-danger'
					>
						Delete
					</button>
				</div>
			</div>
			<CardList cards={cards} />
		</>
	);
}

export default DeckContent;