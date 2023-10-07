import React from 'react';
import Breadcrumb from '../../common/TwoItemBreadcrumb';
import { createDeck } from '../../utils/api';
import CustomForm from '../../common/CustomForm';

function CreateDeck({ history, handleDeckCreation }) {

	const deckFields = [
		{
			label: 'Name',
			id: 'deck-name',
			name: 'deckName',
			placeholder: 'Deck Name',
		},
		{
			label: 'Description',
			id: 'deck-description',
			name: 'deckDescription',
			type: 'textarea',
			placeholder: 'Brief description of deck',
		},
	];

	const submitDeckHandler = async formData => {
		try {
			const newDeck = {
				name: formData.deckName,
				description: formData.deckDescription,
			};

			const createdDeck = await createDeck(newDeck);

			handleDeckCreation(createdDeck);

			history.push(`/decks/${createdDeck.id}`);
		} catch (err) {
			console.error('Error adding new deck:', err);
		}
	};

	return (
		<div>
			<Breadcrumb deckName={'Create Deck'} />
			<div>
				<h1>Create Deck</h1>
				<CustomForm
					onSubmit={submitDeckHandler}
					fields={deckFields}
				/>
			</div>
		</div>
	);
}

export default CreateDeck;
