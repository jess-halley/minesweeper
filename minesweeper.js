document.addEventListener('DOMContentLoaded', startGame)

// Board Variables
var rowLength = 4;
var colLength = 4;
var board = {
  cells:[]

};

// Generate Cell Function
function generateCell() {
for(var i = 0; i< rowLength; i++) {
  for(var y = 0; y< colLength; y++) {
  var createCell = {
      row: i,
      col: y,
      isMarked: false,
      isMine: false,
      hidden: true
    }
    board.cells.push(createCell);
  }
  }
}

// Start Game Function
function startGame () {
  generateCell();
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  document.addEventListener ('click',checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  lib.initBoard()
}


// Check For Win Conditions
function checkForWin () {
  for (var i=0; i<board.cells.length; i++) {
    if ((board.cells[i].isMine == true) && (board.cells[i].isMarked !== true)) {
      return;
    }
    else if  ((board.cells[i].isMine !== true) && (board.cells[i].hidden == true)) {
      return
    }
  }
  lib.displayMessage('You win!');
  return;
}

//Count Surrounding Mines Function
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;
  for(var i=0; i< surrounding.length; i = i + 1){
    if (surrounding[i].isMine == true) {
      count ++;
    }
  }
  return count;

}
