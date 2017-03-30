document.addEventListener('DOMContentLoaded', startGame)

// Board Variables
var boardSize = 6;
var difficulty = 0.2;
var board = {
  cells:[]

};

// Generate Cell Function
function generateCells() {
for(var x = 0; x < boardSize; x++) {
  for(var y = 0; y < boardSize; y++) {
  var createCell = {
      row: x,
      col: y,
      isMarked: false,
      isMine: generateMine(),
      hidden: true
    }
    board.cells.push(createCell);
  }
  }
}

// Random Mine Generator
function generateMine(){
  var mine = Math.random();
  if (mine < difficulty){
    return true;
  }
  else{
    return false;
  }
}

// Start Game Function
function startGame () {
  generateCells();
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
