import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import Breadcrumb from '../../common/ThreeItemBreadcrumb';
import StudyContent from './StudyContent';
import NotEnoughCards from './NotEnoughCards';

function Study() {
	const { deckId } = useParams();
	const history = useHistory();
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		readDeck(deckId)
			.then(res => {
				setDeck(res);
				setCards(res.cards);
			})
			.catch(err => console.log(err));
	}, [deckId]);

	const handleCardFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const handleNextCard = () => {
		if (currentCardIndex < cards.length - 1 && isFlipped) {
			setCurrentCardIndex(currentCardIndex + 1);
			setIsFlipped(false);
		} else if (currentCardIndex === cards.length - 1) {
			const shouldRestart = window.confirm(
				'Restart cards?\n\nClick "cancel" to return to the home page.'
			);
			if (shouldRestart) {
				setCurrentCardIndex(0);
				setIsFlipped(false);
			} else {
				history.push('/');
			}
		}
	};

	return (
		<>
			<Breadcrumb
				deckId={deckId}
				deckName={deck.name}
				view={'Study'}
			/>
			<h1>Study: {deck.name}</h1>
			{cards.length <= 2 ? (
				<NotEnoughCards />
			) : (
				<StudyContent
					cards={cards}
					currentCardIndex={currentCardIndex}
					isFlipped={isFlipped}
					handleCardFlip={handleCardFlip}
					handleNextCard={handleNextCard}
				/>
			)}
		</>
	);
}

export default Study;
