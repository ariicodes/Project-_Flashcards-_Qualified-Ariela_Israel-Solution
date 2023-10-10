import React from 'react';
import { Link, useParams } from 'react-router-dom';

function CardForm({
	cardFront,
	cardBack,
	submitCardHandler,
	handleFrontChange,
	handleBackChange,
}) {
	const deckId = useParams();

	return (
		<div>
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
						value={cardFront}
						onChange={handleFrontChange}
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
						value={cardBack}
						onChange={handleBackChange}
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
	);
}

export default CardForm;
