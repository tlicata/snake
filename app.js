$(document).ready(function () {
  var EMPTY = "_";
  var SNAKE = "S";
  var APPLE = "A";

  var BOARD_WIDTH = 10;        // in squares
  var BOARD_HEIGHT = 10;       // in squares
  var SQUARE_WIDTH = 20;       // in pixels
  var SQUARE_HEIGHT = 20;      // in pixels
  var SQUARE_BORDER_WIDTH = 1; // in pixels

  var generateBoard = function () {
    var n = BOARD_WIDTH * BOARD_HEIGHT;
    var board = [];
    for (var i = 0; i < n; i++) {
      board.push(EMPTY);
    }
    return board;
  };

  var displayBoard = function (board) {
    var totalWidth = BOARD_WIDTH * (SQUARE_WIDTH + (SQUARE_BORDER_WIDTH * 2));
    var container = $("#game").css("width", totalWidth + "px");
    var n = board.length;
    for (var i = 0; i < n; i++) {
      var square = container.find("#"+i);
      if (square.length === 0) {
        square = $("<div></div>").attr({
          "id": i,
          "class": "square"
        }).css({
          "border": "solid black " + SQUARE_BORDER_WIDTH + "px",
          "height": SQUARE_HEIGHT,
          "width": SQUARE_WIDTH
        });
        container.append(square);
      }
      square.text(board[i]);
    }
  };

  var tiles = generateBoard();
  displayBoard(tiles);

  console.log(tiles);
});
