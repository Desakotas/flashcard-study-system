import { useState } from 'react';

function AddCardForm({ onAddCard }) {

  const [ question, setQuestion ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); 
    setQuestion('');
    onAddCard(question);
  }

  function onTyping(e) {
    setQuestion(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__question" value={question} onChange={onTyping} placeholder="Enter your question here..."/>
      <button type="submit" className="add__button" >Add</button>
    </form>
  );
}

export default AddCardForm;
