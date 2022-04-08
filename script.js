
class Gameboard {

    #board = [[" "," "," "],
              [" "," "," "],
              [" "," "," "]]
    #Xturn = true

    get boardState() {
        return this.#board
    }

    placeMarker(x, y) {
        let wasSuccessful

        if (this.#board[y][x] == " ") {

            if (this.#Xturn == true) {
                this.#board[y][x] = "X"
            } else {
                this.#board[y][x] = "O"
            }

            this.#Xturn = !this.#Xturn // change turn

            wasSuccessful = true
        } else {
            wasSuccessful = false
        }
        // TODO: check for victory

        return wasSuccessful
    }

    // to be a viable win group, all values must match and not blank
    areWinGroup(a,b,c) {
        if ((a == b && b == c) && (a != " ")) {
            return true
        } else {
            return false
        }
    }

    checkWin() {
        let a, b, c

        // check if rows are same
        for(let y = 0; y < 3; y++) {
            a = this.#board[y][0]
            b = this.#board[y][1]
            c = this.#board[y][2]
            if (this.areWinGroup(a,b,c)) {
                return true
            }  
        }

        // check if columns are same
        for(let x = 0; x < 3; x++) {
            a = this.#board[0][x]
            b = this.#board[1][x]
            c = this.#board[2][x]
            if (this.areWinGroup(a,b,c)) {
                return true
            }  
        }

        // check if diagonals are same
        a = this.#board[0][0]
        b = this.#board[1][1]
        c = this.#board[2][2]
        if (this.areWinGroup(a,b,c)) {
            return true
        }  
        a = this.#board[0][2]
        b = this.#board[1][1]
        c = this.#board[2][0]
        if (this.areWinGroup(a,b,c)) {
            return true
        }

        return false // only remaining possibility is no win
    }

}

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
                    console.log(gameBoard.checkWin())
                })

            }
        }
    }

}

let myGameboard = new Gameboard()
Display.render(myGameboard)
Display.setup(myGameboard)

let popup = document.createElement("div")

