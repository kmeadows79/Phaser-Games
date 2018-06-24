var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var level = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
			 [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var floorTiles;
var wallTiles;
var cursors;
var playerX = 2;
var playerY = 2;
var buttonDown = false;
var winText;

var mainState = {
	preload:function(){
		game.load.image('floor', "assets/floorTile.png");
		game.load.image('wall', "assets/wallTile.png");
		game.load.image('player', "assets/robot.png");
		game.load.image('exit', "assets/exit.png");

	},

	create:function(){
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

		floorTiles = game.add.group();
		floorTiles.enableBody = true;
		floorTiles.setAll('anchor.x', 0);
		floorTiles.setAll('anchor.y', 0);

		wallTiles = game.add.group();
		wallTiles.enableBody = true;
		wallTiles.setAll('anchor.x', 0);
		wallTiles.setAll('anchor.y', 0);

		drawLevel();

		player = game.add.sprite(playerX*40, playerY*40, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();

		winText = game.add.text(game.world.centerX,game.world.centerY,'You Escaped!',{font: '32px Arial',fill : '#ffffff'});
		winText.anchor.setTo(0.5);
		winText.visible = false;
	},

	update:function(){

		if(cursors.up.isDown && !buttonDown){
			if (isMovable(0,-1)){
				playerY -= 1;
				movePlayer();
				buttonDown = true;
			}
		}
		if(cursors.down.isDown && !buttonDown){
			if (isMovable(0,1)){
				playerY += 1;
				movePlayer();
				buttonDown = true;
			}
		}
		if(cursors.left.isDown && !buttonDown){
			if (isMovable(-1,0)){
				playerX -= 1;
				movePlayer();
				buttonDown = true;
			}
		}
		if(cursors.right.isDown && !buttonDown){
			if (isMovable(1,0)){
				playerX += 1;
				movePlayer();
				buttonDown = true;
			}
		}

		if(cursors.up.isUp && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp){
			buttonDown = false;
		}

		if(level[playerY][playerX] == 3){
				winText.visible = true;
		}

	}

}

function drawLevel(){
	for(var i = 0; i < level.length; i++){
		for(var j = 0; j < level[i].length; j++){
			if(level[i][j] == 0){
				var floorTile = floorTiles.create(j*40, i*40, 'floor');
			} else if (level[i][j] == 1){
				var wallTile = wallTiles.create(j*40, i*40, 'wall');
			} else if (level[i][j] == 2){
				var floorTile = floorTiles.create(j*40, i*40, 'floor');
				playerX = j;
				playerY = i;
			} else if (level[i][j] == 3){
				var floorTile = floorTiles.create(j*40, i*40, 'floor');
				exit = game.add.sprite(j*40, i*40, 'exit');
			}
		}
	}
}

function isMovable(deltaX, deltaY){
	if (level[playerY + deltaY][playerX + deltaX] == 1){
		return false;
	} else {
		return true;
	}
}

function movePlayer(){
	var playerTween = game.add.tween(player).to({x:playerX*40, y:playerY*40},250,Phaser.Easing.Linear.None,true,0,0,false);
}

game.state.add('mainState', mainState);

game.state.start('mainState');