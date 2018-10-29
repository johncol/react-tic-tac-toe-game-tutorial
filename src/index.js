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

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={ () => this.setState({ value: 'X' }) }
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  renderSquare(index) {
    return <Square />;
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
