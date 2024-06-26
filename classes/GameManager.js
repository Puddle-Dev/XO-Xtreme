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
        this.playerMoves.set(this.players[0].name, [])
        this.playerMoves.set(this.players[1].name, [])
        return this;
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
            const location = this.playerMoves.get(playerName).shift();
            this.board.removePiece(location[0], location[1]);
        }

        console.log(playerName + " moves: ");
        for (let moves of this.playerMoves.get(playerName)) {
            console.log(moves)
        }
    }

    getPlayerMoves(playerName){
        return this.playerMoves.get(playerName)

    }

    getPlayerMoveLength(playerName){
        return this.playerMoves.get(playerName).length === 3;
    }

    //check if the player wins
    checkWinner(playerName) {
        const moves = this.playerMoves.get(playerName);
        if (moves.length >= 3) {
            if (this.checkRow(moves) || this.checkColumn(moves) || this.checkDiagonal(moves)) {
                this.gameOver = true;
                this.winner = playerName;
                console.log(playerName + " wins!");
                console.log(moves);
                return true;
            }
        }

        return false;
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

        for (let i = 1; i < 3; i++) {
            const [row, col] = moves[i];
            if (row - firstRow !== col - firstCol) {
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

    getBoard() {
        return this.board;
    }
}

export default GameManager;