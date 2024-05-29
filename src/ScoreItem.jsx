function ScoreItem({
    score,
  }) {
    return (
      <div className="score-item">
				<span>{score.score}</span>
				<span>{score.time}</span>
				<span>{score.date}</span>
				<span>{score.detail}</span>
    	</div>
    );
  }
  
export default ScoreItem;