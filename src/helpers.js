export const cardCount = (cards, id) => {
	const result = cards.filter(card => id === card.deckId);
	return result.length;
};