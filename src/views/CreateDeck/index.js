import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../common/TwoItemBreadcrumb';
import { createDeck } from '../../utils/api';

function CreateDeck({ history, handleDeckCreation }) {
	const [deckName, setDeckName] = useState('');
	const [deckDescription, setDeckDescription] = useState('');

	useEffect(() => {
		return () => {};
	}, []);

	const submitDeckHandler = async e => {
		e.preventDefault();

		try {
			const newDeck = {
				name: deckName,
				description: deckDescription,
			};

			const createdDeck = await createDeck(newDeck);

			handleDeckCreation(createDeck)

			history.push(`/decks/${createdDeck.id}`);
		} catch (error) {
			console.error('Error adding new deck:', error);
		}
	};

	return (
		<>
			<Breadcrumb deckName={'Create Deck'} />
			<div>
				<h1>Create Deck</h1>
				<form onSubmit={submitDeckHandler}>
					<div className='mb-3'>
						<label
							htmlFor='deck-name'
							className='form-label'
						>
							Name
						</label>
						<input
							type='text'
							className='form-control'
							id='deck-name'
							placeholder='Deck Name'
							value={deckName}
							onChange={e => setDeckName(e.target.value)}
						/>
					</div>
					<div className='mb-3'>
						<label
							htmlFor='deck-description'
							className='form-label'
						>
							Description
						</label>
						<textarea
							className='form-control'
							id='deck-description'
							rows='4'
							placeholder='Brief description of deck'
							value={deckDescription}
							onChange={e => setDeckDescription(e.target.value)}
						></textarea>
					</div>
					<div>
						<button className='btn btn-secondary btn-1'>Cancel</button>
						<button className='btn btn-primary'>Submit</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default CreateDeck;
