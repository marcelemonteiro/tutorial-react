import Square from '../Square';

function Board(props) {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        winner={props.winnerSquares ? props.winnerSquares.includes(i) : ''}
        key={i}
      />
    );
  };

  const renderBoard = () => {
    let squares = [];
    let index = 0;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        squares.push(renderSquare(index));
        index++;
      }
    }
    return squares;
  };

  return (
    <div>
      <div className='board'>{renderBoard()}</div>
    </div>
  );
}

export default Board;
