import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import Breadcrumb from './Breadcrumb';
import CardList from './CardList';

function Deck() {
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);

	useEffect(() => {
		readDeck(deckId)
			.then(res => {
				setDeck(res);
				setCards(res.cards);
                console.log(res)
			})
			.catch(err => console.log(err));
	}, [deckId]);

	return (
		<>
			<Breadcrumb deckName={deck.name} />
			<div className='mb-4'>
				<h4>{deck.name}</h4>
				<p>{deck.description}</p>
				<div className='d-flex justify-content-between'>
					<div className='d-flex'>
						<button className='btn btn-secondary btn-1'>Edit</button>
						<button className='btn btn-primary btn-1'>Study</button>
						<button className='btn btn-primary'>Add Cards</button>
					</div>
					<button className='btn btn-danger'>Delete</button>
				</div>
			</div>
            <CardList cards={cards} />
		</>
	);
}

export default Deck;
