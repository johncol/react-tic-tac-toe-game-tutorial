import React, { Component as ReactComponent } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ShoppingList extends ReactComponent {
  render() {
    return (
      <div className="shopping-list">
        <h1>Static shopping list for "{this.props.name}"</h1>
        <ul>
          <li>Popcorn</li>
          <li>Soda</li>
          <li>Perfume</li>
          <li>Wine</li>
        </ul>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      next: 'X',
    };
  }

  render() {
    const winner = this.calculateWinner();
    const status = winner ?
      `${winner} is winner` :
      'Next player: ' + this.state.next;

    const toSquare = this.toSquare.bind(this);
    const boardIndexes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    return (
      <div>
        <div className="status">{status}</div>
        {boardIndexes.map((colIndexes, colIndex) =>
          <div className="board-row" key={colIndex}>
            {colIndexes.map(toSquare)}
          </div>
        )}
      </div>
    );
  }

  toSquare(index) {
    return (
      <Square
        key={index}
        value={this.state.squares[index]}
        onClick={() => this.handleClick(index)}
      />
    );
  }

  handleClick(index) {
    const noOneHasWonAlready = !this.calculateWinner();
    const squareIsEmpty = !this.state.squares[index];
    if (noOneHasWonAlready && squareIsEmpty) {
      const squares = this.state.squares.slice();
      squares[index] = this.state.next;
      this.setState({
        squares,
        next: this.state.next === 'X' ? 'O' : 'X',
      });
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.state.squares;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
