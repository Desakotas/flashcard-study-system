function CardItem({
    card,
    isLastAdded,
    onDeleteCard,
    onUpdateCard,
  }) {
    const isAddToTestClass = card.addToTest ? "card__text--toadd" : "";
    const isAddedClass = isLastAdded ? "card__text--added" : "";
    return (
      <>
        <label>
          <input
            className="card__toggle"
            data-id={card.id}
            type="checkbox"
            checked={card.addToTest}
            onChange={ (e) => {
              const id = e.target.dataset.id;
              onUpdateCard(id);
            }}
          />
          <span
            data-id={card.id}
            className={`card__toggle card__text ${ isAddToTestClass } ${isAddedClass}`}
          >
            {card.question}
          </span>
        </label>
        <button
          data-id={card.id}
          className="card__delete"
          onClick={ (e) => {
            const id = e.target.dataset.id;
            onDeleteCard(id);
          }}
        >
          &#10060;
        </button>
      </>
    );
  }
  
  export default CardItem;