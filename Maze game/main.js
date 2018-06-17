var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var cursors;
var bullets;
var bulletTime = 0;
var fireButton;
var enemies;

var mainState = {
	preload:function(){
		game.load.image('floorTile', "assets/floorTile.png");
		game.load.image('player', "assets/spaceship.png");
		game.load.image('bullet', "assets/laserBeam.png");
		game.load.image('asteroid', "assets/asteroid.png");

	},

	create:function(){
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
		mapLevel = game.add.tileSprite(0, 0, 800, 600, "floorTile");

		player = game.add.sprite(game.world.centerX - 300, game.world.centerY, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();

		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		asteroids = game.add.group();
		asteroids.enableBody = true;
		asteroids.physicsBodyType = Phaser.Physics.ARCADE;

		createAsteroids();

	},

	update:function(){
		game.physics.arcade.overlap(bullets,asteroids,collisionHandler,null,this);

		player.body.velocity.y = 0;

		if(cursors.up.isDown){
			player.body.velocity.y = -350;
		}
		if(cursors.down.isDown){
			player.body.velocity.y = 350;
		}
		if(fireButton.isDown){
			fireBullet();
		}

	}

}

function fireBullet(){
	if(game.time.now > bulletTime){
		bullet = bullets.getFirstExists(false);
		if(bullet){
			bullet.reset(player.x + player.width, player.y + player.height/2);
			bullet.body.velocity.x = 400;
			bulletTime = game.time.now + 200;
		}
	}
}

function createAsteroids(){
	for(var y = 0; y < 6; y++){
		for(var x = 0; x < 3; x++){
			var asteroid = asteroids.create(x*60, y*75, 'asteroid');
		}
	}
	
	asteroids.x = 600;
	asteroids.y = 50;
	
	var tween = game.add.tween(asteroids).to({y:150},2000,Phaser.Easing.Linear.None,true,0,1000,true);

	tween.onLoop.add(approach,this);

}

function approach(){
	asteroids.x += -10;
}

function collisionHandler(bullet,asteroid){
	bullet.kill();
	asteroid.kill();
}

game.state.add('mainState', mainState);

game.state.start('mainState');