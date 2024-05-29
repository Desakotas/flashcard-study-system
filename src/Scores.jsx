import Loading from './Loading';
import ScoreItem from './ScoreItem';

function Scores({
	scores,
	isScorePending,
	bestScore,
}) {
	const SHOW = {  
		PENDING: 'pending',
		EMPTY: 'empty',
		SCORES: 'scores',
	};

	const scoreCount = Object.keys(scores).length;
	let show;
  if(isScorePending) {
    show = SHOW.PENDING;
  } else if (!scoreCount) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.SCORES;
  }

	return (
		<>
      { show === SHOW.PENDING && <Loading className="scores__waiting">Loading Scores...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Score Items yet, go testing!</p>
      )}
      { show === SHOW.SCORES && (
        <div className="content-score">
					<div className="scores-header">
						<span>Score</span>
						<span>Time</span>
						<span>Date</span>
						<span>Detail</span>
  				</div>
          <ul className="scores">
						{ Object.values(scores).map( score => (
							<li className="score" key={score.id}>
								<ScoreItem
									score={score}
								/>
							</li>
						))}
					</ul>
					<div className="bestscore">Your personal best score is {bestScore} </div>
        </div>
      )}
    </>
  );
}
  
export default Scores;