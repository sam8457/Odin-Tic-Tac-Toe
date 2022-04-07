
class Gameboard {

    #board = [["X"," "," "],
              [" ","O"," "],
              [" "," ","X"]]
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

    static render(board) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                
                let box = document.getElementsByClassName(`x${x} y${y}`)[0] // elements should be unique
                box.textContent = board[y][x]

            }
        }
    }

    

}

let myGameboard = new Gameboard()
Display.render(myGameboard.boardState)
