import React from 'react';
import { Link } from 'react-router-dom';

function CardList({ cards, setCards, deckId }) {
const handleCardDelete = async cardId => {
	const confirmed = window.confirm(
		'Delete this card?\n\nYou will not be able to recover it.'
	);

	if (!confirmed) {
		return;
	}

	try {
		await fetch(`http://localhost:8080/cards/${cardId}`, {
			method: 'DELETE',
		});
		setCards(prevCards => prevCards.filter(card => card.id !== cardId));
	} catch (err) {
		console.error('Error deleting card', err);
	}
};


	const cardList = cards.map(card => (
		<div
			className='card'
			key={card.id}
		>
			<div className='card-body'>
				<div className='row'>
					<p className='col card-text'>{card.front}</p>
					<p className='col card-text'>{card.back}</p>
				</div>
				<div className='d-flex justify-content-end'>
					<Link
						to={`/decks/${deckId}/cards/${card.id}/edit`}
						className='btn btn-secondary btn-1'
					>
						Edit
					</Link>
					<button
						onClick={() => handleCardDelete(card.id)}
						className='btn btn-danger'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	));

	return (
		<div>
			<h3>Cards</h3>
			{cardList}
		</div>
	);
}

export default CardList;
