var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
  game.load.image("background", "assets/background.png");
  game.load.image("blacksquare", "assets/blacksquare.png");
  game.load.image("player", "assets/christmas_tiles.png");
}

function create(){
  game.add.sprite(0, 0, "background");
}

function update(){

}