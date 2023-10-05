import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import DeckContent from './DeckContent';
import EditDeck from '../EditDeck';
import AddCard from '../AddCard';

function Deck({ handleDeckDelete, handleCardCreation }) {
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

	const handleDeckEdit = () => {
		readDeck(deckId)
			.then(res => {
				setDeck(res);
			})
			.catch(err => console.log(err));
	};

	return (
		<>
			<Switch>
				<Route path='/decks/:deckId/edit'>
					<EditDeck handleDeckEdit={handleDeckEdit} />
				</Route>
				<Route path='/decks/:deckId/cards/new'>
					<AddCard
						deck={deck}
						handleCardCreation={handleCardCreation}
					/>
				</Route>
				<Route>
					<DeckContent
						deck={deck}
						cards={cards}
						setCards={setCards}
						deckId={deckId}
						handleDeckDelete={handleDeckDelete}
					/>
				</Route>
			</Switch>
		</>
	);
}

export default Deck;
