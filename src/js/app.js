const game = {};
game.NUM_OF_HOLES = 16;
game.HEART_SYMBOL = '♥';
game.INTERVAL = 1000; //
const randomField = () => Math.floor(Math.random() * game.NUM_OF_HOLES);

function newGame() {
  document.location.reload();
}

function gameOver() {
  clearInterval(game.interval);
  game.liveEl.classList.add('display-none');
  game.gameOverEl.classList.remove('display-none');
  game.goblin.onclick = null;
}

function looseLive() {
  game.live -= 1;
  let liveText = '';
  for (let i = 0; i < game.live; i += 1) {
    liveText += game.HEART_SYMBOL;
  }
  game.liveValueEl.innerText = liveText;

  if (game.live === 0) {
    gameOver();
  }
}

function updateScore() {
  game.score += 1;
  game.scoreEl.innerText = game.score;
}

function moveGoblin(lose) {
  if (lose) {
    looseLive();
  }

  let position;
  do {
    position = randomField();
  } while (position === game.currentGoblinPosition);
  game.holes[position].appendChild(game.goblin);

  if (game.live !== 0) {
    game.currentTimer = setTimeout(moveGoblin, game.INTERVAL, true);
  }
}

function clickToGoblin() {
  updateScore();
  clearTimeout(game.currentTimer);
  moveGoblin(false);
}

function fieldInit() {
  game.field = document.querySelector('.field');
  game.holes = [];
  game.goblin = document.createElement('div');
  game.goblin.classList.add('field__goblin');
  game.scoreEl = document.querySelector('.score__value');
  game.liveEl = document.querySelector('.live__value');
  game.score = 0;
  game.live = 5;
  game.newGameBtn = document.querySelector('.game__newgame');
  game.liveEl = document.querySelector('.game__live');
  game.liveValueEl = game.liveEl.querySelector('.live__value');
  game.gameOverEl = document.querySelector('.game__over');

  for (let i = 0; i < game.NUM_OF_HOLES; i += 1) {
    const hole = document.createElement('div');
    hole.classList.add('field__hole');
    game.holes.push(hole);
    game.field.appendChild(hole);
  }

  const position = randomField();
  game.holes[position].appendChild(game.goblin);

  game.newGameBtn.onclick = newGame;
  game.goblin.onclick = clickToGoblin;

  moveGoblin(false);
}

fieldInit();
