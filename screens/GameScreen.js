import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import GameBoard from '../component/GameBoard';
import GameManager from '../classes/GameManager';
import PlayerModule from '../classes/PlayerModule';
import BoardModule from '../classes/BoardModule';

function GameScreen() {

    const [gameManager, setGameManager] = useState(null);
    
    const initGame = () =>{
        const boardInstance = new BoardModule(3, 3);
        boardInstance.initBoard();
        const player1 = new PlayerModule("Player 1", "X");
        const player2 = new PlayerModule("Player 2", "O");
        const gameManagerInstance = new GameManager(boardInstance, [player1, player2]);
        gameManagerInstance.initGame();
    
        setGameManager(gameManagerInstance);
    }

    useEffect(() => {
        initGame();
    }, []);

    const renderBoard = () => {
        return (
            <View>
                <GameBoard gameManager={gameManager} setGameManager={setGameManager} />
            </View>
        )
    }

    return (
        <View>
            <Text>Game Screen</Text>
            {gameManager ?
                renderBoard()
                :
                <Text>loading...</Text>
            }
            <View>
            </View>
        </View>
    )
}


export default GameScreen;