import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import Board from './component/Board';
import GameManager from './classes/GameManager';
import PlayerModule from './classes/PlayerModule';
import BoardModule from './classes/BoardModule';

function GameScreen() {

    const [board, setBoard] = useState(null);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [gameManager, setGameManager] = useState(null);

    const initGame = () =>{
        console.log("Game started");
        if(gameManager){
            gameManager.initGame();
        }
    }

    const handleMove = (row, col) => {
        if(gameManager){
            console.log(row, col, "clicked");
            gameManager.makeMove(row, col);
        }
        // setBoard(gameManager.board);
    }

    useEffect(() => {
        console.log("init game");

        const boardInstance = new BoardModule(3, 3);
        const player1Instance = new PlayerModule("Player 1", "X");
        const player2Instance = new PlayerModule("Player 2", "O");
        const gameManagerInstance = new GameManager(boardInstance, [player1Instance, player2Instance]);


        setBoard(boardInstance);
        setPlayer1(player1Instance);
        setPlayer2(player2Instance);
        setGameManager(gameManagerInstance);

    }, []);


    return (
        <View>
            <Text>Game Screen</Text>
            {gameManager ? 
            <Board board={gameManager.board} handleMove={handleMove}/> 
             : <Text>loading...</Text>}
            <View>
                <Button title="start" onPress={initGame} />
            </View>
        </View>
    )
}


export default GameScreen;