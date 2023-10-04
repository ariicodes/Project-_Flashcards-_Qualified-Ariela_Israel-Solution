import React from 'react';

function StudyContent({
	cards,
	currentCardIndex,
	isFlipped,
	handleCardFlip,
	handleNextCard,
}) {
	const currentCard = cards[currentCardIndex];

	return (
		<div className='card'>
			<div className='card-body'>
				<h5 className='card-title'>
					Card {currentCardIndex + 1} of {cards.length}
				</h5>
				{isFlipped ? (
					<p className='card-text'>{currentCard.back}</p>
				) : (
					<p className='card-text'>{currentCard.front}</p>
				)}
				<button
					className='btn btn-secondary btn-1'
					onClick={handleCardFlip}
				>
					Flip
				</button>
				{isFlipped && (
					<button
						className='btn btn-primary'
						onClick={handleNextCard}
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default StudyContent;
