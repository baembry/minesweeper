import React, { Component } from 'react';

//components
import Row from './Row';

//utils
import boardUtil from '../utils/board';
import getKey from '../utils/getKey';

//services
import app from '../services/app';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      bombs: 5,
      boardSize: 10,
      flash: false,
    };
  }

  componentDidMount() {
    app.handleSquareSelect = this.handleSquareSelect.bind(this);
    app.markSquare = this.markSquare.bind(this);
    this.reset();
  }

  handleSquareSelect(row, column) {
    const board = [...this.state.board];
    if (
      row < 0 ||
      column < 0 ||
      row >= board.length ||
      column >= board.length
    ) {
      return;
    }
    const square = board[row][column];
    if (square.clicked) {
      return;
    }
    if (square.value === 'b') {
      this.flash('BOOM!');
      this.reset();
      return;
    }
    if (square.value > 0) {
      square.clicked = true;
      this.setState({ board });
      return;
    }
    if (square.value === 0) {
      square.clicked = true;
      this.setState({ board });
      //click all surrounding squares
      for (let r = row - 1; r < row + 2; r++) {
        for (let c = column - 1; c < column + 2; c++) {
          this.handleSquareSelect(r, c);
        }
      }
    }
  }

  checkForWin() {
    const board = [...this.state.board];
    for (let row of board) {
      for (let square of row) {
        if (square.marked && square.value !== 'b') {
          console.log('No win');
          return;
        }
        if (square.value === 'b' && !square.marked) {
          console.log('No win');
          return;
        }
      }
    }
    this.flash('Winner!');
    this.reset();
  }

  markSquare(row, column) {
    const board = [...this.state.board];
    board[row][column].marked = !board[row][column].marked;
    this.setState({ board }, () => {
      this.checkForWin();
    });
  }

  reset() {
    const board = boardUtil.makeBoard(this.state.boardSize);
    boardUtil.placeBombs(board, this.state.bombs);
    console.log(board);
    this.setState({ board });
  }

  flash(message) {
    this.setState({ flash: message });
    setTimeout(() => {
      this.setState({ flash: false });
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>Minesweeper!</h1>
        <div className="board">
          {this.state.board.map((row, index) => (
            <Row row={row} rowNumber={index} key={getKey()} />
          ))}
        </div>
        <div className={this.state.flash ? 'flash' : 'hidden'}>
          <div className="flash__message">{this.state.flash || null}</div>
        </div>
      </div>
    );
  }
}

export default App;
