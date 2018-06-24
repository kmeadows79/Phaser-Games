var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

/*var level = [[1,1,1],
			 [0,0,0],
			 [1,1,1]];*/
var level = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var floorTiles;
var wallTiles;
var cursors;
var playerX = 40;
var playerY = 40;
var buttonDown = false;

var mainState = {
	preload:function(){
		game.load.image('floor', "assets/floorTile.png");
		game.load.image('wall', "assets/wallTile.png");
		game.load.image('player', "assets/robot.png");

	},

	create:function(){
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
/*		mapLevel = game.add.tileSprite(0, 0, 40, 40, "floorTile");
*/
		floorTiles = game.add.group();
		floorTiles.enableBody = true;
		floorTiles.createMultiple(6, 'floor');
		floorTiles.setAll('anchor.x', 0);
		floorTiles.setAll('anchor.y', 0);

		wallTiles = game.add.group();
		wallTiles.enableBody = true;
		wallTiles.createMultiple(6, 'wall');
		wallTiles.setAll('anchor.x', 0);
		wallTiles.setAll('anchor.y', 0);

		drawLevel();

		player = game.add.sprite(playerX, playerY, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();

	},

	update:function(){

		player.body.velocity.y = 0;

		if(cursors.up.isDown && !buttonDown){
			player.body.y -= 40;
			buttonDown = true;
		}
		if(cursors.down.isDown && !buttonDown){
			player.body.y += 40;
			buttonDown = true;
		}
		if(cursors.left.isDown && !buttonDown){
			player.body.x -=40;
			buttonDown = true;
		}
		if(cursors.right.isDown && !buttonDown){
			player.body.x += 40;
			buttonDown = true;
		}

		if(cursors.up.isUp && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp){
			buttonDown = false;
		}

	}

}

function drawLevel(){
/*	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 2; j++){
			var floorTile = floorTiles.create(i*40, j*40, 'floor');
		}
	}*/
/*	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 3; j++){
			if(level)
			var floorTile = floorTiles.create(i*40, j*40, 'floor');
			var wallTile = wallTiles.create(i*40, j*40, 'wall');
		}
	}*/
	for(var i = 0; i < level.length; i++){
		for(var j = 0; j < level[i].length; j++){
			if(level[i][j] == 0){
				var floorTile = floorTiles.create(j*40, i*40, 'floor');
			} else if (level[i][j] == 1){
				var wallTile = wallTiles.create(j*40, i*40, 'wall');
			}
		}
	}
}

game.state.add('mainState', mainState);

game.state.start('mainState');