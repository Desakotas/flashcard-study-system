import { useState, useEffect} from "react";
import './Test.css';
import Loading from './Loading';

function Test({ testCards, isCardPending, onEndTest, onAddScore, onStartTest}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [knowCount, setKnowCount] = useState(0);
	const [testComplete, setTestComplete] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);

	const ques = testCards[currentIndex].question
	const testCardCount = testCards.length;
	const formattedTime = formatTime(timeElapsed);

	function onNext() {
		if (currentIndex < testCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } 
	}

	function onKnow() {
		const newCount = knowCount + 1;
		if (currentIndex === testCards.length - 1) {
			const curScore = (newCount / testCardCount) * 100;
			const date = new Date().toISOString().slice(0, 10); 
    	onAddScore({ 
				score: curScore.toFixed(2),
				detail: `${newCount} / ${testCardCount}`,
				time: formattedTime,
				date: date
    	});
			setCurrentScore(curScore.toFixed(2));
			setTestComplete(true);

		}else{
			setKnowCount(newCount);
			onNext();
		}
  }

	function onNotKnow() {
		if (currentIndex === testCards.length - 1) {
			const curScore = (knowCount / testCardCount) * 100;
			const date = new Date().toISOString().slice(0, 10); 
			onAddScore({ 
				score: curScore.toFixed(2),
				detail: `${knowCount} / ${testCardCount}`,
				time: formattedTime,
				date: date
			});
			setCurrentScore(curScore.toFixed(2));
			setTestComplete(true);
			
		} else {
			onNext();
		}
  }

	function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
 	}

	function retakeTest() {
		setCurrentIndex(0);  
    setKnowCount(0);    
    setTimeElapsed(0);  
    setTestComplete(false);
    setCurrentScore(null);

    onStartTest(); 
 	}

	useEffect(() => {
    const timer = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
    }, 1000); 

    return () => clearInterval(timer); 
	}, []);

	const SHOW = {  
    PENDING: 'pending',
    TESTCARDS: 'testCards',
  };
  
  let show;
  if (isCardPending) {
		show = SHOW.PENDING;
	} else if (testComplete) {
		show = SHOW.COMPLETE;
	} else {
		show = SHOW.TESTCARDS;
	}

	return (
		<div className="test">
			{ show === SHOW.PENDING && <Loading className="testcards__waiting">Loading testCards...</Loading> }
			{ show === SHOW.TESTCARDS && (
				<>
					<div className="status-board">
						<div className="progress">
							<label>Progress</label>
							<span>{currentIndex + 1}/{testCardCount}</span>
						</div>
						<div className="time">
							<label>TimeElapsed</label>
							<span>{formattedTime}</span>
						</div>
					</div>
					<div className="question">{ques}</div>
					<div className="test-control">
						<button className="button-know" onClick={onKnow}>Know</button>
						<button className="button-notknow" onClick={onNotKnow}>Don't know</button>
					</div>
					<button className="button-quit" onClick={onEndTest}>Quit</button>
				</>
			)}
			{show === SHOW.COMPLETE && (
				<div className="test-result">
					<div className="result-content">Your Test Score: {currentScore}</div>
					<div className="result-button">
						<button className="button-retake" onClick={retakeTest}>Retake Test</button>
						<button className="button-back" onClick={onEndTest}>Back</button>
					</div>
				</div>
      )}
		</div>
	);
}
export default Test;