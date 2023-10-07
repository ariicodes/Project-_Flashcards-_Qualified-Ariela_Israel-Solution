import React from 'react';
import ThreeItemBreadcrumb from '../../common/ThreeItemBreadcrumb';
import { useParams } from 'react-router-dom';
import { createCard } from '../../utils/api';
import CustomForm from '../../common/CustomForm';

function AddCard({ deck, handleCardCreation }) {
	const { deckId } = useParams();

	const cardFields = [
		{
			label: 'Front',
			id: 'card-front',
			name: 'cardFront',
			type: 'textarea',
			placeholder: 'Front side of card',
		},
		{
			label: 'Back',
			id: 'card-back',
			name: 'cardBack',
			type: 'textarea',
			placeholder: 'Back side of card',
		},
	];

	const submitCardHandler = async formData => {
		try {
			const newCard = {
				front: formData.cardFront,
				back: formData.cardBack,
			};

			await createCard(deckId, newCard);

			handleCardCreation(newCard);
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
				<CustomForm
					onSubmit={submitCardHandler}
					fields={cardFields}
				/>
			</div>
		</div>
	);
}

export default AddCard;
