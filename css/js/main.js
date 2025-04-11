// Initialize the chess game logic using chess.js
var game = new Chess();

// Setup event handlers for the chessboard using chessboard.js
function onDragStart(source, piece, position, orientation) {
  // Prevent user from moving pieces if the game is over
  if (game.game_over()) {
    return false;
  }
}

function onDrop(source, target) {
  // Attempt to make a legal move
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // always promote to a queen for simplicity
  });

  // Illegal move? Snap the piece back.
  if (move === null) return 'snapback';

  updateStatus();
}

function onSnapEnd() {
  // Update board position after piece snap for legal moves
  board.position(game.fen());
}

function updateStatus() {
  var status = '';

  // Check if the game is over
  if (game.in_checkmate()) {
    status = 'Game over, checkmate!';
  } else if (game.in_draw()) {
    status = 'Game over, drawn position!';
  } else {
    // Game is still on. Indicate which player's turn it is.
    status = (game.turn() === 'w' ? 'White' : 'Black') + ' to move';
    if (game.in_check()) {
      status += ' (in check)';
    }
  }

  document.getElementById('status').innerHTML = status;
}

// Configure the chessboard
var board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

// Reset button: start a new game
document.getElementById('resetBtn').addEventListener('click', function() {
  game.reset();
  board.start();
  updateStatus();
});

// Initialize the game status
updateStatus();
