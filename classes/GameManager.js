class GameManager {
    constructor(board, players) {
        this.board = board;
        this.players = players;
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.winner = null;
        this.playerMoves = new Map();
    }

    //init the game
    initGame() {
        console.log("Game started");
        this.board.initBoard();
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.winner = null;
        this.playerMoves.set(this.players[0].name, [{row: null, col: null}]);
        this.playerMoves.set(this.players[1].name, [{row: null, col: null}]);
    }

    //place a piece on the board
    makeMove(row, col) {
        console.log("Player " + this.players[this.currentPlayerIndex].name + " is making a moveto: " + row + " " + col);

        if (this.gameOver) {
            console.log("Game over. Cannot place piece.");
            return;
        }

        const player = this.players[this.currentPlayerIndex];
        console.log(player.getName() + " placed a piece at row: " + row + " column: " + col);
        this.board.placePiece(row, col, player);
        this.updatePlayerMoves(player.name, row, col);
        this.checkWinner(player.name);
        this.switchPlayer();
        console.log(player)
    }

    //update the player's moves
    updatePlayerMoves(playerName, row, col) {
        if (this.playerMoves.has(playerName)) {
            this.playerMoves.get(playerName).push([row, col]);
        } else {
            this.playerMoves.set(playerName, [[row, col]]);
        }

        //delete the first move when the player making the 4th move
        if (this.playerMoves.get(playerName).length > 3) {
            this.playerMoves.get(playerName).shift();
        }

        console.log(playerName + " moves: " + this.playerMoves.get(playerName));
    }

    //check if the player wins
    checkWinner(playerName) {
        const moves = this.playerMoves.get(playerName);
        if (moves.length >= 3) {
            if (this.checkRow(moves) || this.checkColumn(moves) || this.checkDiagonal(moves)) {
                this.gameOver = true;
                this.winner = playerName;
                console.log(playerName + " wins!");
            }
        }
    }

    //check if the player wins in a row
    checkRow(moves) {
        const row = moves[0][0];
        for (let i = 1; i < moves.length; i++) {    //check if all the moves are in the same row
            if (moves[i][0] !== row) {
                return false;
            }
        }
        return true;
    }

    //check if the player wins in a column
    checkColumn(moves) {
        const col = moves[0][1];
        for (let i = 1; i < moves.length; i++) {    //check if all the moves are in the same column
            if (moves[i][1] !== col) {
                return false;
            }
        }
        return true;
    }

    //check if the player wins in a diagonal
    checkDiagonal(moves) {

        const [firstRow, firstCol] = moves[0];

        for (let i = 1; i < moves.length; i++) {
            const [row, col] = moves[i];
            //check if the moves are in the diagonal
            if (Math.abs(row - firstRow) !== Math.abs(col - firstCol)) {
                return false;
            }
        }
        return true;

    }

    //switch to the next player
    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    //get the current player
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

}

export default GameManager;