import React from 'react';
import DeckList from '../Deck/DeckList';
import { Link } from 'react-router-dom';

function Home({ decks, cards, handleDeckDelete }) {
	return (
		<>
			<Link
				to='/decks/new'
				type='button'
				className='btn btn-secondary mb-2'
			>
				Create Deck
			</Link>
			<DeckList
				decks={decks}
				cards={cards}
				handleDeckDelete={handleDeckDelete}
			/>
		</>
	);
}

export default Home;