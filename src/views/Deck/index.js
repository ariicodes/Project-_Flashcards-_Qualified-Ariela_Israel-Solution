import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import DeckContent from './DeckContent';
import EditDeck from '../EditDeck';

function Deck({ handleDeckDelete }) {
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);

	useEffect(() => {
		readDeck(deckId)
			.then(res => {
				setDeck(res);
				setCards(res.cards);
			})
			.catch(err => console.log(err));
	}, [deckId]);

	return (
		<>
			<Switch>
				<Route path='/decks/:deckId/edit'>
					<EditDeck />
				</Route>
				<Route>
					<DeckContent
						deck={deck}
						cards={cards}
						deckId={deckId}
						handleDeckDelete={handleDeckDelete}
					/>
				</Route>
			</Switch>
		</>
	);
}

export default Deck;
