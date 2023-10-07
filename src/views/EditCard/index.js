import React, { useEffect, useState } from 'react';
import ThreeItemBreadcrumb from '../../common/ThreeItemBreadcrumb';
import { useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../../utils/api';

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
							name='front'
							value={card.front}
							onChange={handleInputChange}
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
							name='back'
							value={card.back}
							onChange={handleInputChange}
						></textarea>
					</div>
					<div>
						<button
							onClick={() => history.push(`/decks/${deckId}`)}
							className='btn btn-secondary btn-1'
						>
							Cancel
						</button>
						<button className='btn btn-primary'>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditCard;
