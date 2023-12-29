class Player{
    constructor(sign){
        this.signMark = sign;
    }

    getPlayerSign(){
        return this.signMark;
    }
}


class GameBoard{
    constructor(gameBoard){
        this.gameBoard = gameBoard;
    }

    setSign(sign, x, y){
        this.gameBoard[x][y] = sign;
        return;
    }

    getSign(x, y){
        return this.gameBoard[x][y];
    }
}

class Game{
    constructor(player1, player2, gameBoard){
        this.player1 = player1;
        this.player2 = player2;
        this.gameBoard = gameBoard;
        this.currPlayer = player1;
    }

    swapPlayer(){
        if(this.currPlayer == this.player1){
            this.currPlayer = this.player2;
        }else{
            this.currPlayer = this.player1;
        }
    }

    checkWinner(sign, x, y){
        let result = true;
        let i = 0;

        for(i = 0; i < 3; i++){
            if(this.gameBoard.getSign(x, i) !== sign){
                result = false;
                break;
            }
        }

        if(result) return true;

        result = true;

        for(i = 0; i < 3; i++){
            if(this.gameBoard.getSign(i, y) !== sign){
                result = false;
                break;
            }
        }

        if(result) return true;

        result = true;

        for(i = 0; i< 3; i++){
            if(this.gameBoard.getSign(i, i) !== sign){
                result = false;
                break;
            }
        }

        if(result) return true;
        result = true;

        for(i = 0; i< 3; i++){
            if(this.gameBoard.getSign(i, 2 - i) !== sign){
                result = false;
                break;
            }
        }

        return result;
    }
}


(() =>{
const player1 = new Player("X");
const player2 = new Player("O");
const gameBoard = new GameBoard([
    ['$', '$', '$'],
    ['$', '$', '$'],
    ['$', '$', '$']
]);
const game = new Game(player1, player2, gameBoard);

document.querySelector(".tboard.grid").addEventListener("click", (e) =>{
    const gridItems = document.querySelectorAll(".grid-item");
    const nextPlayerDOM = document.querySelector("input:not(:checked)");
    console.log(nextPlayerDOM);
    console.log(e.target);
    gridItems.forEach((item, index) =>{
        let x = parseInt(index / 3);
        let y = index % 3;
        const currPlayerSign = game.currPlayer.getPlayerSign();
        if(item === e.target && game.gameBoard.getSign(x, y) === '$'){  
            game.gameBoard.setSign(currPlayerSign, x, y);
            console.log(game.gameBoard);
                item.innerHTML = currPlayerSign;
                
                let isWinner = game.checkWinner(currPlayerSign, x, y);
                console.log(isWinner);
                setTimeout(() => {
                    if(isWinner == true){
                    alert("Current Winner is: " + currPlayerSign);
                     }
                }, 400);

                game.swapPlayer();
            
                nextPlayerDOM.checked = true;
        }
    });
}
);
})();