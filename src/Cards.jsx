import Loading from './Loading';
import CardItem from './CardItem';

function Cards({
  cards,
  isCardPending,
  lastAddedCardId,
  onDeleteCard,
  onUpdateCard,
}) {
  const SHOW = {  
    PENDING: 'pending',
    EMPTY: 'empty',
    CARDS: 'cards',
  };

  const cardCount = Object.keys(cards).length;
  
  let show;
  if(isCardPending) {
    show = SHOW.PENDING;
  } else if (!cardCount) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.CARDS;
  }

  return (
    <div className="main-content">
      { show === SHOW.PENDING && <Loading className="cards__waiting">Loading Cards...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Card Items yet, add one!</p>
      )}
      { show === SHOW.CARDS && (
        <>
          <p className="card-count">Number of cards: {cardCount}</p> 
          <ul className="cards">
            { Object.values(cards).map( card => (
              <li className="card" key={card.id}>
                <CardItem
                  card={card}
                  isLastAdded={lastAddedCardId===card.id}
                  onDeleteCard={onDeleteCard}
                  onUpdateCard={onUpdateCard}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Cards;