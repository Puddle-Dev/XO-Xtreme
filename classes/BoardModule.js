class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];
    }

    //initialize the board with  null values
    initBoard() {
        let board = [];
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.columns; j++) {
                row.push(null);
            }
            board.push(row);
        }
        this.cells = board;
        return this.cells;
    }

    //check if the location is valid
    isValidLocation(row, col) {
        //if the row and column are within the board
        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
            if (this.cells[row][col] === null) {  //if the cell is empty
                return true;    //return the cell
            }
        }
        console.log("row: " + row + " column: " + col + " is not a valid location");
        return false;
    }

    //place a piece on the board
    placePiece(row, col, player) {
        if (!this.isValidLocation(row, col)) {  //if the location is valid
            return null;
        }

        this.cells[row][col] = player;   //place the player
        console.log(player + " is placed at row: " + row + " column: " + col);

        // //place the piece
        // this.board[row][col] = player.getPiece();   //place the player
        // console.log(player.getPiece() + " is placed at row: " + row + " column: " + col + " by " + player.getName());
        return this.cells;
    }

    //remove a piece from the board
    removePiece(row, col) {
        if (this.cells[row][col] !== null) {  //if the cell is not empty
            this.cells[row][col] = null;   //remove the piece
            console.log("piece is removed from row: " + row + " column: " + col);
            return true;
        }
        console.log("row: " + row + " column: " + col + " is already empty");
        return false;
    }

    //get signle cell value
    getCellValue(row, col) {
       return this.cells[row][col];
    }
}

export default Board;