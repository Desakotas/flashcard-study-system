import { useState, useEffect } from 'react';
import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchCards,
  fetchUpdateCard,
  fetchDeleteCard,
  fetchAddCard,
  fetchTestCards,
  fetchScores,
  fetchAddScore,
} from './services';

import LoginForm from './LoginForm';
import Cards from './Cards';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddCardForm from './AddCardForm';
import Test from './Test';
import Scores from './Scores';
import NavBar from './NavBar';


function App() {
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); 
  const [ isCardPending, setIsCardPending ] = useState(false);
  const [ cards, setCards ] = useState({});
  const [ lastAddedCardId, setLastAddedCardId ] = useState();
  const [isTesting, setIsTesting] = useState(false);
  const [testCards, setTestCards] = useState([]);
  const [scores, setScores] = useState(0);
  const [ lastAddedScoreId, setLastAddedScoreId ] = useState();
  const [bestScore, setBestScore] = useState(0);
  const [ isScorePending, setIsScorePending ] = useState(false);
  const [page, setPage] = useState('Questions');

  function onLogin( username ) {
    setIsCardPending(true);
    fetchLogin(username)
    .then( fetchedCards => {
      setError(''); 
      setCards( fetchedCards );
      setIsCardPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
  
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setCards({});
    setScores({}); 
    setBestScore(0); 
    setLastAddedCardId('');
    setPage('Questions');
    fetchLogout() 
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onRefresh() {
    setError('');
    setIsCardPending(true); 
    fetchCards()
    .then(cards => {
      setCards(cards);
      setLastAddedCardId('');
      setIsCardPending(false);
      return fetchScores();
    })
    .then(scoresDatas => {
      setScores(scoresDatas);
      calculateBestScore(scoresDatas);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onDeleteCard(id) {
    setError('');
    setIsCardPending(true); 
    fetchDeleteCard(id)
      .then( () => {
        return fetchCards(); 
      })
      .then( cards => {
        setCards(cards);
        setIsCardPending(false);
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); 
      });
  }

  function onUpdateCard(id) {
    fetchUpdateCard(id, { addToTest: !cards[id].addToTest } )
    .then( card => { 
      setCards({
        ...cards, 
        [id]: card, 
      });
      setLastAddedCardId('');
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onAddCard(question) {
    fetchAddCard(question)
    .then( card => {
      setCards({ 
        ...cards,
        [card.id]: card, 
      });
      setLastAddedCardId(card.id);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onStartTest() {
    setError('');
    setIsCardPending(true);
    fetchTestCards()
    .then(testCards => {
      if (testCards.length === 0) {
        setError('no-question');
        setIsCardPending(false);
      }else{
        setTestCards(testCards);
        setIsCardPending(false);
        setIsTesting(true);
      }
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onEndTest() {
    setIsTesting(false);
  }

  function onShowScore() {
    setIsScorePending(true);
    fetchScores()
    .then(testScores => {
      setScores(testScores);
      calculateBestScore(testScores);
      setIsScorePending(false); 
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onAddScore(scoreData) {
		fetchAddScore(scoreData)
    .then( score => {
      setScores({ 
        ...scores,
        [score.id]: score, 
      });
      setLastAddedScoreId(score.id);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function calculateBestScore(scoresDatas){
    const scoresArray = Object.values(scoresDatas).map(scoreData => scoreData.score);
    const highestScore = scoresArray.length > 0 ? Math.max(...scoresArray) : 0;
    setBestScore(highestScore);
  }

  function checkForSession() {
    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchCards(); 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err); 
    })
    .then( cards => {
      setCards(cards);
      
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
     
      setError(err?.error || 'ERROR'); 
    });
  }

  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );

  return (
    <div className="app">
      { error && <Status error={error}/> }
      { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
      { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
      { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className="content">
          {isTesting ? (
          <Test 
            testCards={testCards}
            isCardPending={isCardPending}
            onEndTest={onEndTest}
            onAddScore={onAddScore}
            onStartTest={onStartTest}
          />
        ) : (
          <>
            <p>Hello, {username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <NavBar setPage={setPage} onShowScore={onShowScore}/>
            { page === 'Questions' && 
              (
              <>
                <Cards
                  isCardPending={isCardPending}
                  cards={cards}
                  lastAddedCardId={lastAddedCardId}
                  onDeleteCard={onDeleteCard}
                  onUpdateCard={onUpdateCard}
                /> 
                <AddCardForm onAddCard={onAddCard}/>
                <button className="button-start-test" onClick={onStartTest}>Start Test</button>
              </>
              )} 
            { page === 'Scores' && <Scores scores={scores} bestScore={bestScore} /> }
          </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
