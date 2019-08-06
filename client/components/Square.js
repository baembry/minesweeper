import React from 'react';
import app from '../services/app';

const Square = ({ square, rowNumber, columnNumber }) => {
  return (
    <div
      className="square"
      data-row={rowNumber}
      data-column={columnNumber}
      onClick={event => {
        console.log(event);
        app.handleSquareSelect(rowNumber, columnNumber);
      }}
      onContextMenu={event => {
        event.preventDefault();
        app.markSquare(rowNumber, columnNumber);
      }}
    >
      <div className="square__content">
        {square.clicked ? square.value : square.marked ? 'M' : null}
      </div>
    </div>
  );
};

export default Square;
