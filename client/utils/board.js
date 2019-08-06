class Square {
  constructor() {
    this.value = 0;
    this.clicked = false;
    this.marked = false;
  }
}
function makeBoard(n) {
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(new Square());
    }
    board.push(row);
  }
  return board;
}
function placeBombs(board, bombs) {
  let bomb = 0;
  while (bomb < bombs) {
    const row = Math.floor(Math.random() * board.length);
    const col = Math.floor(Math.random() * board.length);
    if (board[row][col].value === 'b') {
      continue;
    }
    board[row][col].value = 'b';
    //update squares around bomb
    for (let r = row - 1; r < row + 2; r++) {
      for (let c = col - 1; c < col + 2; c++) {
        if (
          r >= 0 &&
          c >= 0 &&
          r < board.length &&
          c < board.length &&
          board[r][c].value !== 'b'
        ) {
          board[r][c].value++;
        }
      }
    }
    bomb++;
  }
}

export default { makeBoard, placeBombs };
