
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

let myGameboard = new Gameboard()
