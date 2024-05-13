import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Board from './component/Board';

export default function AppDemo() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [count, setCount] = useState(1);

  const handlePress = (i) => {
    console.log(i);
    //set the value of the board at index i to 'X'
    const newBoard = [...board];
    if(count%2 === 0){
      newBoard[i] = 'O';
    }else{
      newBoard[i] = 'X';
    }
    setCount(count+1);
    setBoard(newBoard);
  }

  const handleReset = () => {
    setCount(1);
    setBoard(Array(9).fill(null));
  }

  const checkWinner = () => {
    //check rows
    for(let i=0;i<9;i+=3){
      if(board[i] && board[i] === board[i+1] && board[i] === board[i+2]){
        return board[i];
      }
    }

    //check columns
    for(let i=0;i<3;i++){
      if(board[i] && board[i] === board[i+3] && board[i] === board[i+6]){
        return board[i];
      }
    }

    //check diagonals
    if(board[0] && board[0] === board[4] && board[0] === board[8]){
      return board[0];
    }

    if(board[2] && board[2] === board[4] && board[2] === board[6]){
      return board[2];
    }

    return null;
  }

  useEffect(() => {
    const winner = checkWinner();
    if(winner){
      alert(`${winner} wins!`);
    }
  }, [board]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Board board={board} onPress={handlePress} />
      <Button title='Reset' onPress={handleReset}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
