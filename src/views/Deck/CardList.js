import React from 'react';
import axios from 'axios';

function CardList({ cards, setCards }) {
	const handleCardDelete = async cardId => {
		const confirmed = window.confirm(
			'Delete this card?\n\nYou will not be able to recover it.'
		);

		if (!confirmed) {
			return;
		}

		try {
			await axios.delete(`http://localhost:8080/cards/${cardId}`);
			setCards(prevCards => prevCards.filter(card => card.id !== cardId));
		} catch (error) {
			console.error('Error deleting card', error);
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
					<button className='btn btn-secondary btn-1'>Edit</button>
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
		<>
			<h3>Cards</h3>
			{cardList}
		</>
	);
}

export default CardList;
