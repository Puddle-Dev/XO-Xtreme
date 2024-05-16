// import { v4 as uuidv4 } from 'uuid';
class Player{

    constructor(name, piece){
        // this.id = id;
        this.name = name;
        this.piece = piece;
    }

    //get the player's name
    getName(){
        return this.name;
    }

    //get the player's piece
    getPiece(){
        return this.piece;
    }

}

export default Player;