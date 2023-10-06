import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../views/Home';
import Study from '../views/Study';
import CreateDeck from '../views/CreateDeck';
import Deck from '../views/Deck';
import { listDecks } from '../utils/api';

function Layout() {
	const [cards, setCards] = useState([]);
	const [decks, setDecks] = useState([]);
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await listDecks();
				setDecks(res);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};

		fetchData();
	}, []);

	const handleDeckDelete = async deckId => {
		const confirmed = window.confirm(
			'Delete this deck?\n\nYou will not be able to recover it.'
		);

		if (confirmed) {
			try {
				await fetch(`http://localhost:8080/decks/${deckId}`, {
					method: 'DELETE',
				});
				setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
				history.push('/');
			} catch (error) {
				console.log('Error deleting deck:', error);
			}
		}
	};

	const handleDeckCreation = newDeck => {
		setDecks(prevDecks => [...prevDecks, newDeck]);
	};

	const handleCardCreation = newCard => {
		setCards(prevCards => [...prevCards, newCard]);
	};

	return (
		<div>
			<Header />
			<div className='container'>
				{/* TODO: Implement the screen starting here */}
				<Switch>
					<Route path='/decks/:deckId/study'>
						<Study cards={cards} />
					</Route>
					<Route path='/decks/new'>
						<CreateDeck
							history={history}
							decks={decks}
							handleDeckCreation={handleDeckCreation}
						/>
					</Route>
					<Route path='/decks/:deckId'>
						<Deck
							handleDeckDelete={handleDeckDelete}
							handleCardCreation={handleCardCreation}
						/>
					</Route>
					<Route
						exact
						path='/'
					>
						<Home
							decks={decks}
							cards={cards}
							handleDeckDelete={handleDeckDelete}
						/>
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Layout;
