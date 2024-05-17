import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

function GameBoard({ gameManager, setGameManager }) {
  //set prop types
  GameBoard.propTypes = {
    gameManager: PropTypes.shape({
      board: PropTypes.shape({
        rows: PropTypes.number.isRequired,
        columns: PropTypes.number.isRequired,
        cells: PropTypes.array.isRequired,
        isValidLocation: PropTypes.func.isRequired,
        placePiece: PropTypes.func.isRequired,
        getCellValue: PropTypes.func.isRequired,
      }).isRequired,
      players: PropTypes.array.isRequired,
      winner: PropTypes.string,
      initGame: PropTypes.func.isRequired,
      getCurrentPlayer: PropTypes.func.isRequired,
      updatePlayerMoves: PropTypes.func.isRequired,
      switchPlayer: PropTypes.func.isRequired,
      checkWinner: PropTypes.func.isRequired,
      getPlayerMoves: PropTypes.func.isRequired,
    }).isRequired,
    setGameManager: PropTypes.func.isRequired,
  }

  const [board, setBoard] = useState(gameManager.board);

  const handleCellPress = (row, col) => {
    console.log("row: " + row + " column: " + col + " is clicked");
    const currentPlayerName = gameManager.getCurrentPlayer().getName();
    const newCells = board.placePiece(row, col, gameManager.getCurrentPlayer().getPiece());
    if (newCells !== null) {
      gameManager.updatePlayerMoves(currentPlayerName, row, col);
      updateBoard(newCells);
      gameManager.switchPlayer();
    }
    if(gameManager.checkWinner(currentPlayerName)){
        alert("Winner: " + gameManager.winner);
      }
  }

  const updateBoard = (newCells) => {
    setBoard(b => ({ ...b, cells: newCells }))
  }

  //render the single square
  const renderSquare = (row, col) => {
    const index = row * board.columns + col;
    const currentPlayerName = gameManager.getCurrentPlayer().getName();
    const playerMoves = gameManager.getPlayerMoves(currentPlayerName);
    const isFirstMove = playerMoves.length === 3 && playerMoves[0].row === row && playerMoves[0].col === col;

    return (
      <TouchableOpacity
        key={index}
        style={styles.square}
        onPress={() => { handleCellPress(row, col); }}
      >
        {isFirstMove?
        <Text style={[styles.squareText, styles.redText]}>{board.cells[row][col]}</Text>
        :
        <Text style={styles.squareText}>{board.cells[row][col]}</Text>
      }
      </TouchableOpacity>
    )
  }

  const renderBoard = () => {
    const row = [];
    for (let rowIndex = 0; rowIndex < board.rows; rowIndex++) {
      const cells = [];
      for (let colIndex = 0; colIndex < board.columns; colIndex++) {
        cells.push(renderSquare(rowIndex, colIndex));
      }
      row.push(
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {cells}
        </View>
      );
    }
    return row;
  };

  const handleReset = () =>{
    //reset the board
    const emptyCells = board.initBoard();
    updateBoard(emptyCells);
    gameManager.initGame();
    setGameManager(gameManager);
    console.log("board has been cleaned");
  }

  useEffect(() => {
    console.log("board updated");
    setBoard(gameManager.board);  //update the board
  }, [board])

  return (
    <View>
      <View style={styles.board}>
        {renderBoard()}
      </View>

      <View>
        <Button title="start" onPress={handleReset} />
      </View>
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
  redText:{
    color:'#ccc'
  }
});

export default GameBoard;
