import React from 'react';
import Board from '../Board';

const calculateWinner = (squares) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winner = {
        symbol: squares[a],
        winnerSquares: [a, b, c],
      };
      return winner;
    }
  }
  return null;
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastIndex: 0,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      listReverse: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastIndex: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      currentSquareIndex: i,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      const coordenadas = [
        ['col=1, row=1'],
        ['col=2, row=1'],
        ['col=3, row=1'],
        ['col=1, row=2'],
        ['col=2, row=2'],
        ['col=3, row=2'],
        ['col=1, row=3'],
        ['col=2, row=3'],
        ['col=3, row=3'],
      ];
      const currentSquare = step.lastIndex;
      console.log('currentSquare', currentSquare);
      return (
        <li className='move' key={move}>
          <button className='move-button' onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
          <span className='coordenada'>
            {desc === 'Go to game start' ? '' : coordenadas[currentSquare]}
          </span>
        </li>
      );
    });

    console.log('history:', history);
    let status;
    if (winner) {
      status = 'VENCEDOR: ' + winner.symbol;
    } else if (history.length === 10) {
      status = 'EMPATE';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            winnerSquares={winner ? winner.winnerSquares : ''}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <h2>{status}</h2>
          <label for='desc'>Decrescente</label>
          <input
            type='checkbox'
            id='desc'
            onClick={() =>
              this.state.listReverse
                ? this.setState({ listReverse: false })
                : this.setState({ listReverse: true })
            }
          />
          <ol
            className={`moves-list ${this.state.listReverse ? 'reverse' : ''}`}
          >
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
