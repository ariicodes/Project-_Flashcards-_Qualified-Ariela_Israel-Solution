import React, { useState } from 'react';
import ThreeItemBreadcrumb from '../../common/ThreeItemBreadcrumb';
import { Link, useParams } from 'react-router-dom';
import { createCard } from '../../utils/api';

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
		} catch (error) {
			console.error('Error adding new card:', error);
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
				<form onSubmit={submitCardHandler}>
					<div className='mb-3'>
						<label
							htmlFor='card-front'
							className='form-label'
						>
							Front
						</label>
						<textarea
							className='form-control'
							id='card-front'
							rows='2'
							placeholder='Front side of card'
							value={cardFront}
							onChange={e => setCardFront(e.target.value)}
						></textarea>
					</div>
					<div className='mb-3'>
						<label
							htmlFor='card-back'
							className='form-label'
						>
							Back
						</label>
						<textarea
							className='form-control'
							id='card-back'
							rows='2'
							placeholder='Back side of card'
							value={cardBack}
							onChange={e => setCardBack(e.target.value)}
						></textarea>
					</div>
					<div>
						<Link
							to={`/decks/${deckId}`}
							className='btn btn-secondary btn-1'
						>
							Cancel
						</Link>
						<button className='btn btn-primary'>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddCard;
