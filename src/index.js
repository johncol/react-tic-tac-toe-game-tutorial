import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({ onClick, value, isWinnerSquare }) {
  let classNames = 'square';
  if (isWinnerSquare) {
    classNames += ' square--winner';
  }
  return (
    <button className={classNames} onClick={onClick}>
      {value}
    </button>
  );
}

class Board extends React.Component {
  static boardIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];

  render() {
    return (
      <div>
        {Board.boardIndexes.map((colIndexes, colIndex) =>
          <div className="board-row" key={colIndex}>
            {colIndexes.map(index => this.toSquare(index))}
          </div>
        )}
      </div>
    );
  }

  toSquare(index) {
    return (
      <Square
        key={index}
        value={this.props.squares[index]}
        onClick={() => this.props.onClick(index)}
        isWinnerSquare={this.props.winningSquares.indexOf(index) !== -1}
      />
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [ { squares: Array(9).fill(null) } ],
      stepNumber: 0,
      next: 'X',
    };
  }

  render() {
    const squares = this.currentSquares();
    const winner = GameJudge.getWinnerOrNull(squares);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            winningSquares={winner ? GameJudge.getWinnerSquares(squares) : []}
            onClick={index => this.handleClick(index)}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.status(winner)}</div>
          <ol>
            {this.state.history.slice(0, this.state.history.length).map((pastState, index) => (
              <li key={index}>
                <button onClick={() => this.jumpToMove(index)}>
                  Go to move #{index}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  jumpToMove(index) {
    this.setState({
      stepNumber: index,
      next: (index % 2) === 0 ? 'X' : 'O'
    });
  }

  status(winner) {
    const status = winner ?
      `${winner} is winner!` : this.state.stepNumber === 9 ?
        'Both of you are loosers!' : 
        'Next player: ' + this.state.next;
    return status;
  }

  handleClick(index) {
    const squares = this.currentSquares();
    const noOneHasWonAlready = !GameJudge.getWinnerOrNull(squares);
    const squareIsEmpty = !squares[index];
    if (noOneHasWonAlready && squareIsEmpty) {
      this.updateStateWithNewMove(squares, index);
    }
  }

  updateStateWithNewMove(squares, index) {
    const newSquares = squares.slice();
    newSquares[index] = this.state.next;
    const history = this.state.history.slice(0, this.state.stepNumber + 1).concat({ squares: newSquares });
    this.setState({
      history,
      next: this.state.next === 'X' ? 'O' : 'X',
      stepNumber: this.state.stepNumber + 1
    });
  }

  currentSquares() {
    return this.state.history[this.state.stepNumber].squares;
  }
}

class GameJudge {
  static lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  static getWinnerSquares(squares) {
    for (let i = 0; i < GameJudge.lines.length; i++) {
      const [a, b, c] = GameJudge.lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return [];
  }

  static getWinnerOrNull(squares) {
    const winnerSquares = GameJudge.getWinnerSquares(squares);
    return winnerSquares.length !== 0 ?
      squares[winnerSquares[0]] :
      null;
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
