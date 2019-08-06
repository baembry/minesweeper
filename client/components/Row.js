import React from 'react';
import Square from './Square';

//utils
import getKey from '../utils/getKey';

const Row = ({ row, rowNumber }) => {
  return (
    <div className="row">
      {row.map((square, index) => (
        <Square
          square={square}
          columnNumber={index}
          rowNumber={rowNumber}
          key={getKey()}
        />
      ))}
    </div>
  );
};

export default Row;
