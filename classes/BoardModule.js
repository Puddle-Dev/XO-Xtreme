class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.board = this.initBoard();  //initialize the board
    }

    //initialize the board with  null values
    initBoard() {
        const board = [];

        for (let i = 0; i < this.rows; i++) { //rows
            const row = []; //initialize a row
            for (let j = 0; j < this.columns; j++) {  //columns
                row.push(null); //initialize a column
            }
            board.push(row);    //add the row to the board
        }
        return board;
    }

    //check if the location is valid
    isValidLocation(row, col) {
        //if the row and column are within the board
        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
            if (this.board[row][col] === null) {  //if the cell is empty
                return this.board[row][col];    //return the cell
            }
        }
        console.log("row: " + row + " column: " + col + " is not a valid location");
        return null;
    }

    //place a piece on the board
    placePiece(row, col, player) {
        if (!this.isValidLocation(row, col)) {  //if the location is valid
            return null;
        }

        //place the piece
        this.board[row][col] = player.getPiece();   //place the player
        console.log(player.getPiece() + " is placed at row: " + row + " column: " + col);

        //increment the player's piece count
        if (this.playerPieceCount.has(player)) {
            this.playerPieceCount.set(player, this.playerPieceCount.get(player) + 1);
        } else {
            this.playerPieceCount.set(player, 1);
        }
        return true;
    }

    //remove a piece from the board
    removePiece(row, col) {
        if (this.board[row][col] !== null) {  //if the cell is not empty
            this.board[row][col] = null;   //remove the piece
            console.log("piece is removed from row: " + row + " column: " + col);
            return true;
        }
        console.log("row: " + row + " column: " + col + " is already empty");
        return false;
    }

    //get signle cell value
    getCellValue(row, col) {
        if(this.board[row][col] !== null){
            return this.board[row][col];
        }
        return null;
    }
}

export default Board;