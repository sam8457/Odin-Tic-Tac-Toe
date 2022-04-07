
class Gameboard {

    #board = [[" "," "," "],
              [" "," "," "],
              [" "," "," "]]
    #Xturn = true

    get boardState() {
        return this.#board
    }

    placeMarker(x, y) {

        if (this.#board[y][x] == " ") {

            if (this.#Xturn == true) {
                this.#board[y][x] = "X"
            } else {
                this.#board[y][x] = "O"
            }

            this.#Xturn = !this.#Xturn // change turn
        } else {
            // TODO: add code to warn user of invalid move
        }

        // TODO: check for victory

        return this.boardState
    }

}

// TODO: add a gui class
class Display {

    static render(gameBoard) {
        let boardArray = gameBoard.boardState

        for (let y = 0; y < boardArray.length; y++) {
            for (let x = 0; x < boardArray[y].length; x++) {
                
                let box = document.getElementsByClassName(`x${x} y${y}`)[0] // elements should be unique
                box.textContent = boardArray[y][x]

            }
        }
    }

    static setup(gameBoard) {
        let boardArray = gameBoard.boardState

        for (let y = 0; y < boardArray.length; y++) {
            for (let x = 0; x < boardArray[y].length; x++) {
                
                let box = document.getElementsByClassName(`x${x} y${y}`)[0] // elements should be unique
                box.addEventListener("click", function() {
                    gameBoard.placeMarker(x,y)
                    Display.render(gameBoard)
                })

            }
        }
    }

}

let myGameboard = new Gameboard()
Display.render(myGameboard)
Display.setup(myGameboard)
