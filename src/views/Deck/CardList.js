import React from 'react';

function CardList({ cards }) {
	const cardList = cards.map(card => (
		<div
			className='card'
			key={card.id}
		>
			<div className='card-body'>
				<div className='row'>
					<p className='col card-text'>
						{card.front}
					</p>
					<p className='col card-text'>
						{card.back}
					</p>
				</div>
				<div className='d-flex justify-content-end'>
					<button className='btn btn-secondary btn-1'>Edit</button>
					<button className='btn btn-danger'>Delete</button>
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
