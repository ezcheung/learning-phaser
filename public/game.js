var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

let cursors;
let player;
let baddies;
let score = 0;
let scoreText;

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

  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  player.body.velocity.x = 0;

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
    // baddie..onKilled = new Phaser.Signal();
    baddie.events.onKilled.add(addScore, this);
  }

  // game.physics.arcade.overlap(player, baddies, die, null, this);
}

function addScore() {
  score += 10;
  scoreText.text = `Score: ${score}`;
}