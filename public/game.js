var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

let cursors;
let player;
let baddies;
let score = 0;
let scoreText;
let alive = true;
let spacebar;
let loseText;

function preload(){
  game.load.image("background", "assets/background.png");
  game.load.image("blacksquare", "assets/blacksquare.png");
  game.load.image("player", "assets/christmas_tiles.png");
}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, "background");
  player = game.add.sprite(375, 550, "player");

  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  baddies = game.add.group();
  baddies.enableBody = true;

  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  cursors = game.input.keyboard.createCursorKeys();
  spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

function update(){
  player.body.velocity.x = 0;

  if(alive) {
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
    }

    let makeBaddie = Math.random() * 100;
    if(makeBaddie < 10) {
      let baddie = baddies.create(Math.floor(Math.random() * 800), 0, 'blacksquare');
      baddie.body.gravity.y = 300;
      baddie.checkWorldBounds = true;
      baddie.outOfBoundsKill = true;
      baddie.events.onKilled.add(addScore, this);
    }

    game.physics.arcade.overlap(player, baddies, die, null, this);
  } else {
    if(spacebar.isDown) {
      restart();
    }
  }
}

function addScore() {
  if(alive){
    score += 10;
    scoreText.text = `Score: ${score}`;
  }
}

function die() {
  alive = false;
  player.body.velocity.x = 0;
  baddies.forEach((b) => {
    b.body.gravity.y = 0;
    b.body.velocity.y = 0;
  });
  loseText = game.add.text(125, 250, "You lose! Press spacebar to restart", 
    { fontSize: '32px', fill: '#000', boundsAlignH: 'center', boundsAlignV: 'center'});
}

function restart() {
  baddies.forEach((b) => {
    b.kill();
  })
  score = 0;
  scoreText.text = "Score: 0";
  player.position.x = 375;
  player.position.y = 550;
  alive = true;
  if(loseText) loseText.kill();
}