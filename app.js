$(document).ready(function () {
  var EMPTY = "_";
  var SNAKE = "S";
  var APPLE = "A";

  var EMPTY_CLASS = "empty";
  var SNAKE_CLASS = "snake";
  var APPLE_CLASS = "apple";
  var CLASSES_STRING = [EMPTY_CLASS, SNAKE_CLASS, APPLE_CLASS].join(" ");

  var CLASSES = {};
  CLASSES[EMPTY] = EMPTY_CLASS;
  CLASSES[SNAKE] = SNAKE_CLASS;
  CLASSES[APPLE] = APPLE_CLASS;

  var BOARD_WIDTH = 40;        // in squares
  var BOARD_HEIGHT = 25;       // in squares
  var SQUARE_WIDTH = 10;       // in pixels
  var SQUARE_HEIGHT = 10;      // in pixels
  var SQUARE_BORDER_WIDTH = 1; // in pixels

  var TOTAL_SQUARES = BOARD_WIDTH * BOARD_HEIGHT;

  var LEFT = "left";
  var RIGHT = "right";
  var UP = "up";
  var DOWN = "down";

  var tiles = [];
  var snake = [];
  var snakeDirection = RIGHT;

  var generateBoard = function () {
    var board = [];
    for (var i = 0; i < TOTAL_SQUARES; i++) {
      board.push(EMPTY);
    }
    return board;
  };

  var makeNewSquare = function (id) {
    return $("<div></div>").attr({
      "id": id,
      "class": "square"
    }).css({
      "border": "solid black " + SQUARE_BORDER_WIDTH + "px",
      "height": SQUARE_HEIGHT,
      "width": SQUARE_WIDTH
    });
  };

  var displayBoard = function (board) {
    var totalWidth = BOARD_WIDTH * (SQUARE_WIDTH + (SQUARE_BORDER_WIDTH * 2));
    var container = $("#game").css("width", totalWidth + "px");
    var n = board.length;
    for (var i = 0; i < n; i++) {
      var square = container.find("#"+i);
      var contents = board[i];
      if (square.length === 0) {
        square = makeNewSquare(i);
        container.append(square);
      } else {
        square.removeClass(CLASSES_STRING);
      }
      square.addClass(CLASSES[contents]);
    }
  };

  var randomSquare = function (board) {
    return Math.floor(Math.random() * TOTAL_SQUARES);
  };
  var getNeighbor = function (square, direction) {
    if (direction === LEFT) {
      return square % BOARD_WIDTH === 0 ? null : square - 1;
    } else if (direction === RIGHT) {
      return square % BOARD_WIDTH === BOARD_WIDTH - 1 ? null : square + 1;
    } else if (direction === DOWN) {
      return square > TOTAL_SQUARES - BOARD_WIDTH ? null : square + BOARD_WIDTH;
    } else if (direction === UP) {
      return square < BOARD_WIDTH ?  null : square - BOARD_WIDTH;
    }
    console.log("invalid direction", direction);
    return null;
  };

  var getNewSnake = function (oldSnake, direction) {
    var newSnake = oldSnake.concat();
    var oldHead = oldSnake[0];
    var newHead = getNeighbor(oldHead, direction);
    if (newHead === null) {
      return null;
    }
    newSnake.unshift(newHead);
    newSnake.pop();
    return newSnake;
  };

  var updateSnakeDisplay = function (oldSnake, newSnake) {
    oldSnake.forEach(function (square) {
      tiles[square] = EMPTY;
    });
    newSnake.forEach(function (square) {
      tiles[square] = SNAKE;
    });
    displayBoard(tiles);
  };

  var snakeHitsSelf = function (body) {
    var head = body[0];
    return body.indexOf(head, 1) !== -1;
  };

  var initialize = function () {
    var start = randomSquare();
    tiles = generateBoard();
    displayBoard(tiles);
    snake = [start, start-1, start-2, start-3];
    updateSnakeDisplay([], snake);
  };
  initialize();

  var loop = setInterval(function () {
    var oldSnake = snake.concat();
    snake = getNewSnake(oldSnake, snakeDirection);
    if (snake === null || snakeHitsSelf(snake)) {
      clearInterval(loop);
      alert("you died");
    } else {
      updateSnakeDisplay(oldSnake, snake);
    }
  }, 115);

  $(document).on("keydown", function (event) {
    if (event.keyCode === 37) {
      snakeDirection = LEFT;
    } else if (event.keyCode === 38) {
      snakeDirection = UP;
    } else if (event.keyCode === 39) {
      snakeDirection = RIGHT;
    } else if (event.keyCode === 40) {
      snakeDirection = DOWN;
    }
  });
});
