var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

/*var level = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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
var wallTiles;*/
var cursors;
var playerX = 60;
var playerY = 300;
var buttonDown = false;

var mainState = {
	preload:function(){
		game.load.image('floor', "assets/floorTile.png");
/*		game.load.image('wall', "assets/wallTile.png");*/
		game.load.image('player', "assets/robot.png");
	},

	create:function(){
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
		floorMap = game.add.tileSprite(0, 0, 800, 600, "floorTile");

/*		wallTiles = game.add.group();
		wallTiles.enableBody = true;
		wallTiles.physicsBodyType = Phaser.Physics.ARCADE;
		wallTiles.createMultiple(300, 'wall');
		wallTiles.setAll('anchor.x', 0);
		wallTiles.setAll('anchor.y', 0);*/

/*		drawLevel();*/

		player = game.add.sprite(playerX, playerY, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.anchor.setTo(0.5, 0.5);

		cursors = game.input.keyboard.createCursorKeys();

	},

	update:function(){
		player.body.velocity.y = 0;

		if(cursors.up.isDown && !buttonDown){
			player.body.y -=40;
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

/*function drawLevel(){
	for(var i = 0; i < 20; i++){
		for(var j = 0; j < 15; i++){
			var wallTile = wallTiles.create(i*40, j*40, 'wall');
		}
	}
}*/

/*function fireBullet(){
	if(game.time.now > bulletTime){
		bullet = bullets.getFirstExists(false);
		if(bullet){
			bullet.reset(player.x + player.width, player.y + player.height/2);
			bullet.body.velocity.x = 400;
			bulletTime = game.time.now + 200;
		}
	}
}*/

/*function createAsteroids(){
	for(var y = 0; y < 6; y++){
		for(var x = 0; x < 3; x++){
			var asteroid = asteroids.create(x*60, y*75, 'asteroid');
		}
	}
	
	asteroids.x = 600;
	asteroids.y = 50;
	
	var tween = game.add.tween(asteroids).to({y:150},2000,Phaser.Easing.Linear.None,true,0,1000,true);

	tween.onLoop.add(approach,this);

}*/

/*function approach(){
	asteroids.x += -10;
}*/

/*function collisionHandler(bullet,asteroid){
	bullet.kill();
	asteroid.kill();

	score += 100;
}*/

game.state.add('mainState', mainState);

game.state.start('mainState');