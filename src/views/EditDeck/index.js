import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';
import ThreeItemBreadcrumb from '../../common/ThreeItemBreadcrumb';

function EditDeck() {
	const { deckId } = useParams();
	const history = useHistory();
	const [deck, setDeck] = useState({ name: '', description: '' });

	useEffect(() => {
		readDeck(deckId)
			.then(res => {
				setDeck(res);
			})
			.catch(err => console.log(err));
	}, [deckId]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setDeck({ ...deck, [name]: value });
	};

	const editDeckHandler = async e => {
		e.preventDefault();
		try {
			await updateDeck(deckId, deck);
			history.push(`/decks/${deckId}`);
		} catch (error) {
			console.error('Error editing deck:', error);
		}
	};

	return (
		<>
			<ThreeItemBreadcrumb
				deckId={deckId}
				deckName={deck.name}
				view={'Edit Deck'}
			/>
			<h1>Edit Deck</h1>
			<form onSubmit={editDeckHandler}>
				<div className='mb-3'>
					<label htmlFor='deck-name'>Name</label>
					<input
						type='text'
						className='form-control'
						id='deck-name'
						value={deck.name}
						name='name'
						onChange={handleInputChange}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='deck-description'>Description</label>
					<textarea
						className='form-control'
						id='deck-description'
						rows='4'
						value={deck.description}
						name='description'
						onChange={handleInputChange}
					></textarea>
				</div>
				<div>
					<button className='btn btn-secondary btn-1'>Cancel</button>
					<button
						type='submit'
						className='btn btn-primary'
					>
						Submit
					</button>
				</div>
			</form>
		</>
	);
}

export default EditDeck;
