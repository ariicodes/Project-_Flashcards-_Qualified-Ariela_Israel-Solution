import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../views/Home';
import axios from 'axios';
import Study from '../views/Study';
import CreateDeck from '../views/CreateDeck';
import Deck from '../views/Deck';

function Layout() {
	const [cards, setCards] = useState([]);
	const [decks, setDecks] = useState([]);
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res1 = await axios.get('http://localhost:8080/cards');
				setCards(res1.data);

				const res2 = await axios.get('http://localhost:8080/decks');
				setDecks(res2.data);
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
				await axios.delete(`http://localhost:8080/decks/${deckId}`);
				setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
				history.push('/');
			} catch (error) {
				console.error('Error deleting deck:', error);
			}
		}
	};

	return (
		<>
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
						/>
					</Route>
					<Route path='/decks/:deckId'>
						<Deck handleDeckDelete={handleDeckDelete} />
					</Route>
					<Route path='/'>
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
		</>
	);
}

export default Layout;
