
class Gameboard {

    #board = [[" "," "," "],
              [" "," "," "],
              [" "," "," "]]
    #Xturn = true
    #Moves = 0

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
            this.#Moves += 1

            wasSuccessful = true
        } else {
            wasSuccessful = false
        }

        return wasSuccessful
    }

    computerPlay() {

        let randomX
        let randomY

        // Code for random int:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        let wasSuccessful = false
        while (!wasSuccessful) {
            randomX = Math.floor(Math.random() * 3)
            randomY = Math.floor(Math.random() * 3)
            wasSuccessful = this.placeMarker(randomX, randomY)
        }

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
                return a
            }  
        }

        // check if columns are same
        for(let x = 0; x < 3; x++) {
            a = this.#board[0][x]
            b = this.#board[1][x]
            c = this.#board[2][x]
            if (this.areWinGroup(a,b,c)) {
                return a
            }  
        }

        // check if diagonals are same
        a = this.#board[0][0]
        b = this.#board[1][1]
        c = this.#board[2][2]
        if (this.areWinGroup(a,b,c)) {
            return a
        }  
        a = this.#board[0][2]
        b = this.#board[1][1]
        c = this.#board[2][0]
        if (this.areWinGroup(a,b,c)) {
            return a
        }

        if (this.#Moves == 9) {
            return "tie"
        }

        return "" // only remaining possibility is no win
    }

    resetBoard() {
        this.#board = [[" "," "," "],
                       [" "," "," "],
                       [" "," "," "]]
        this.#Xturn = true
        this.#Moves = 0
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

                    if (gameBoard.checkWin() != "") {
                        Display.showPopup(gameBoard)
                    } else { // add if to check if two-player
                        gameBoard.computerPlay()
                        Display.render(gameBoard)
                        if (gameBoard.checkWin() != "") {
                            Display.showPopup(gameBoard)
                        }
                    }
                })

            }
        }
    }

    static showPopup(gameBoard) {

        let winner = gameBoard.checkWin()
        let message

        if (winner == "X") {
            message = "You won!"
        } else if (winner == "O") {
            message = "COM won."
        } else {
            message = "Tie game."
        }

        let dimmer = document.createElement('div')
        dimmer.className = "dimmer"

        let popup = document.createElement('div')
        popup.className = "popup"
        popup.innerHTML = `
            <h2>${message}</h2>
            <button class="again">Play Again</button>
        ` 

        let body = document.getElementsByTagName("body")[0]
        body.appendChild(dimmer)
        body.appendChild(popup)

        let newgameButton = body.querySelector('.again')
        newgameButton.addEventListener('click', function() {
            Display.removePopup()
            gameBoard.resetBoard()
            Display.render(gameBoard)
        })

    }

    static removePopup() {
        let popup = document.querySelector('.popup')
        let dimmer = document.querySelector('.dimmer')

        let body = document.querySelector('body')

        body.removeChild(popup)
        body.removeChild(dimmer)
    }

}

// TODO: add scoreboard element and naming funcitonality, and optional 2-player mode

let myGameboard = new Gameboard()
Display.render(myGameboard)
Display.setup(myGameboard)
