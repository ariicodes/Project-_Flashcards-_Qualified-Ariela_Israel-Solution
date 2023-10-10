import React, { useEffect, useState } from 'react';
import ThreeItemBreadcrumb from '../../common/ThreeItemBreadcrumb';
import { useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../../utils/api';
import CardForm from '../../common/CardForm';

function EditCard({ deck }) {
	const { deckId, cardId } = useParams();
	const [card, setCard] = useState({ front: '', back: '' });
	const history = useHistory();

	useEffect(() => {
		if (cardId) {
			readCard(cardId)
				.then(res => {
					setCard(res);
				})
				.catch(err => console.log(err));
		}
	}, [cardId]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
	};

	const submitCardHandler = async e => {
		e.preventDefault();
		try {
			await updateCard(card);

			const updatedCard = await readCard(cardId);
			setCard(updatedCard);

			history.push(`/decks/${deckId}`);
		} catch (err) {
			console.error('Error editing card:', err);
		}
	};

	return (
		<div>
			<ThreeItemBreadcrumb
				deckId={deckId}
				deckName={`Deck ${deck.name}`}
				view={`Edit Card ${card.id}`}
			/>
			<div>
				<h1>{`${deck.name}: Edit Card`}</h1>
				<CardForm
					cardFront={card.front}
					cardBack={card.back}
					submitCardHandler={submitCardHandler}
					handleFrontChange={handleInputChange}
					handleBackChange={handleInputChange}
				/>
			</div>
		</div>
	);
}

export default EditCard;
