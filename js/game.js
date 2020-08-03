'use strict'
console.log('Ex 60 Solution!!!');

var generationsToRun = +prompt('How many generations would you like to run?')
var userBoardSize = +prompt('What\'s the board size?')
var gameInterval;
runRandomStartGame(userBoardSize,generationsToRun)
    // var gameInterval = setInterval(function() {
    // runFullGame(5, [
    //         [0, 0],
    //         [0, 1],
    //         [0, 2],
    //         [1, 1],
    //         [1, 2],
    //         [2, 2]
    //     ])
    //     // }, 1000)

function updateHtmlBoard(board, genCount) {
    var back = document.querySelector('.back')
    back.innerHTML = drawTable(board)
    var genCountEl = document.querySelector('.gen')
    genCountEl.innerHTML = '<h2>Generation No. ' + genCount + '</h2>'
}

function logClick() {
    console.log(this)
}

function drawTable(board) {
    var outputHtmlString = '<table id="game-board" border="1px"> '
    for (var i = 0; i < board.length; i++) {
        outputHtmlString += '<tr>'
        for (var j = 0; j < board.length; j++) {
            outputHtmlString += '<td onclick="console.log(this)">' + board[i][j] + '</td>'
        }
        outputHtmlString += '</tr>'
    }
    outputHtmlString += '</table>'
    return outputHtmlString
}

// runRandomStartGame(15, 15)

function runRandomStartGame(boardSize, amountOfGenerationsToRun) {
    // initialzing the array
    var randomCellArray = []
        // create random coordinates. pass on boardsize squared halved amount of coords (should be little less than half the board)
    for (var i = 0; i < (boardSize ** 2) / 2; i++) {
        // push a [x,y] array based on random. highest is the boardSize variable
        randomCellArray.push([getRandomInteger(0, boardSize - 1), getRandomInteger(0, boardSize - 1)])
    }
    return runFullGame(boardSize, randomCellArray, amountOfGenerationsToRun)
}

function runFullGame(boardSize, startingCellArry, amountOfGenerationsToRun = 100) {
    var gameBoard = startGamePositions(boardSize, startingCellArry)
        // console.table(gameBoard)
    updateHtmlBoard(gameBoard)
        // drawTable(board)
        // for (var i = 0; i < amountOfGenerationsToRun; i++) {
    var generations = 0
    gameInterval = setInterval(function() {
            if (sumBoard(gameBoard) === 0) {
                console.log('No living cells remain on board after ' + generations + ' generations')
                clearInterval(gameInterval)
                    // break
            } else if (generations >= amountOfGenerationsToRun) {
                clearInterval(gameInterval)
            } else {
                // replicate the board to the tempGameBoard variable
                var tempGameBoard = replicateBoard(gameBoard)
                    // alters the original board to advance one generation
                generations++
                gameBoard = runGeneration(tempGameBoard)
                    // console.table(tempGameBoard)
                console.log(generations)
                updateHtmlBoard(tempGameBoard, generations)
            }
        }, 400)
        // if there are living creatures on the board

    return gameBoard
}

function startGamePositions(boardSize, startingCellArry) {
    // create new board
    var gameBoard = createNewBoard(boardSize)
    var start = startingCellArry
        // for every nested array, derive coordinates and create cell
    for (var i = 0; i < start.length; i++) {
        // console.log(i)
        setSingleCell(gameBoard, start[i][0], start[i][1], true)
    }
    return gameBoard
}

function sumBoard(board) {
    var totalLivingCells = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j]) {
                totalLivingCells++
            }
        }
    }
    return totalLivingCells
}

function runGeneration(board, clearAndDelay = true) {
    // if (clearAndDelay) {
    //     // delay(1000)
    //     console.clear()
    // }
    var newBoard = [...board]
    for (var col = 0; col < board.length; col++) {
        for (var row = 0; row < board.length; row++) {
            setSingleCell(newBoard, row, col, shouldLive(board, row, col))
        }
    }
    return newBoard
}


function shouldLive(board, x, y) {
    // console.log(checkNeighbors(board, x, y))
    if (checkNeighbors(board, x, y) >= 3 && checkNeighbors(board, x, y) <= 5) {
        return true
    }
    return false
}

function checkNeighbors(board, x, y) {
    // initalizing the amount of neighbors to 0
    var totalPopulatedNeighbors = 0
    for (var i = y - 1; i <= y + 1; i++) {
        // if out of bounds - continue without testing
        if (i < 0 || i >= board.length) continue
        for (var j = x - 1; j <= x + 1; j++) {
            // if reached the current cell - do not run
            if (!(j === x && i === y)) {
                // if the coordinates are populated - add 1 to totalPopulatedNeighbors
                if (board[i][j]) {
                    totalPopulatedNeighbors++
                }
            }
        }
    }
    return totalPopulatedNeighbors
}

// function checkCell(board, x, y) {
//     // if the coordinates are populated - return true
//     // // if the coordinates are found but are empty - return false
//     return (board[y][x]) ? true : false
// }

function setSingleCell(board, x, y, isAlive) {
    var liveCreature = (isAlive) ? 'x' : ''
    board[y][x] = liveCreature
    return board
}

function replicateBoard(board) {
    // returns a new board with a deep copy of the given board
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        var currColumn = []
        for (var j = 0; j < board[i].length; j++) {
            currColumn.push(board[i][j])
        }
        newBoard.push(currColumn)
    }
    return newBoard
}

function createNewBoard(size) {
    var board = []
    for (var col = 0; col < size; col++) {
        var currColumn = []
        for (var row = 0; row < size; row++) {
            currColumn.push('')
        }
        board.push(currColumn)
    }
    return board
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - (min - 1))) + min
}