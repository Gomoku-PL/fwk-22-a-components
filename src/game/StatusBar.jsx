import React from 'react';
import PropTypes from 'prop-types';

function StatusBar ({ currentPlayer, winner, moveCount, boardSize, onRestart, lastMove }) {
	let status;
	if (winner === 'draw') {
		status = 'Draw game';
	} else if (winner) {
		status = `${winner === 'B' ? 'Black' : 'White'} wins!`;
	} else {
		status = `Turn: ${currentPlayer === 'B' ? 'Black (●)' : 'White (○)'}`;
	}

	return (
		<div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
			<strong>{status}</strong>
			<span>Moves: {moveCount}</span>
			<span>Size: {boardSize}x{boardSize}</span>
			{lastMove && <span>Last: ({lastMove.row + 1},{lastMove.col + 1})</span>}
			<button onClick={onRestart}>Restart</button>
		</div>
	);
};

StatusBar.propTypes = {
	currentPlayer: PropTypes.oneOf(['B', 'W']).isRequired,
	winner: PropTypes.oneOf(['B', 'W', 'draw', null]),
	moveCount: PropTypes.number.isRequired,
	boardSize: PropTypes.number.isRequired,
	onRestart: PropTypes.func.isRequired,
	lastMove: PropTypes.shape({ row: PropTypes.number, col: PropTypes.number }),
};

StatusBar.defaultProps = {
	winner: null,
	lastMove: null,
};

export default StatusBar;
