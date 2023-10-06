import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { readCard, readDeck } from '../../utils/api';
import DeckContent from './DeckContent';
import EditDeck from '../EditDeck';
import AddCard from '../AddCard';
import EditCard from '../EditCard';

function Deck({ handleDeckDelete, handleCardCreation }) {
	const { deckId, cardId } = useParams();
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

	const handleCardEdit = () => {
		readCard(cardId)
			.then(res => {
				setCards(res);
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
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
				<Route path={`/decks/:deckId/cards/:cardId/edit`}>
					<EditCard
						deck={deck}
						handleCardEdit={handleCardEdit}
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
		</div>
	);
}

export default Deck;
