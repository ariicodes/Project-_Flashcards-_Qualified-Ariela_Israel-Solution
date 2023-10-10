import React, { useState } from 'react';
import ThreeItemBreadcrumb from '../../common/ThreeItemBreadcrumb';
import { useParams } from 'react-router-dom';
import { createCard } from '../../utils/api';
import CardForm from '../../common/CardForm';

function AddCard({ deck, handleCardCreation }) {
	const { deckId } = useParams();
	const [cardFront, setCardFront] = useState();
	const [cardBack, setCardBack] = useState();

	const submitCardHandler = async e => {
		e.preventDefault();
		try {
			const newCard = {
				front: cardFront,
				back: cardBack,
			};

			await createCard(deckId, newCard);

			handleCardCreation(createCard);

			setCardFront('');
			setCardBack('');
		} catch (err) {
			console.error('Error adding new card:', err);
		}
	};

	return (
		<div>
			<ThreeItemBreadcrumb
				deckId={deckId}
				deckName={deck.name}
				view={'Add Card'}
			/>
			<div>
				<h1>{`${deck.name}: Add Card`}</h1>
				<CardForm
					cardFront={cardFront}
					cardBack={cardBack}
					submitCardHandler={submitCardHandler}
					handleFrontChange={e => setCardFront(e.target.value)}
					handleBackChange={e => setCardBack(e.target.value)}
				/>
			</div>
		</div>
	);
}
export default AddCard;
