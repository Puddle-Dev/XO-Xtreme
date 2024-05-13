import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';


function Board({board, handleMove}) {
  Board.propTypes = {
    board: PropTypes.shape({
      rows: PropTypes.number.isRequired,
      columns: PropTypes.number.isRequired,
      getCellValue: PropTypes.func.isRequired,
    }).isRequired,
    handleMove: PropTypes.func.isRequired,
  };

  const row = board.rows;
  const col = board.columns;
  let size = row * col;

  //render a single square with the value i
  const square = (index, value, rowIndex, colIndex) => ( 
    <TouchableOpacity 
      key={index} 
      style={styles.square}
      onPress={() => handleMove(rowIndex, colIndex)}
      >
      <Text style={styles.squareText}>{index}{value}</Text>
    </TouchableOpacity>
  );

  //render the board
  const renderBoard = () => {
    const rows = [];
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      const cells = [];
      for (let colIndex = 0; colIndex < col; colIndex++) {
        const value = board.getCellValue(rowIndex, colIndex);
        cells.push(square(size, value, rowIndex, colIndex));
        size --;
      }
      rows.push(
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {cells}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.board}>
      {renderBoard()}
    </View>
  )

}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#333',
  },
  square: {
    width: '33.33%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Board;
