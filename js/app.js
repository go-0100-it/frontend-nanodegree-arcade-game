// Movables are all moving objects in the game
var Movables = function(x, y, sprite, speed, begin, end) {

    // The image/sprite for our movables, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
    this.begin = begin;
    this.end = end;
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite, speed, begin, end) {
    Movables.call(this, x, y, sprite, speed, begin, end);
};
Enemy.prototype = Object.create(Movables.prototype);

// Helpers our player must use
var Helper = function(x, y, sprite, speed, begin, end) {
    Movables.call(this, x, y, sprite, speed, begin, end);
};
Helper.prototype = Object.create(Movables.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Movables.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
    if (this.end < this.begin && this.x < this.end) {
        this.x = this.begin;
    } else if (this.end > this.begin && this.x > this.end) {
        this.x = this.begin;
    }
};

// Draw the Movable on the screen, required method for game
Movables.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Log = function(x, y, speed, begin, end) {
    Helper.call(this, x, y, 'images/log.png', speed, begin, end);
};
Log.prototype = Object.create(Helper.prototype);

var Turtle = function(x, y, speed, begin, end) {
    Helper.call(this, x, y, 'images/turtle.png', speed, begin, end);
};
Turtle.prototype = Object.create(Helper.prototype);

var Car = function(x, y, speed, begin, end) {
    Enemy.call(this, x, y, 'images/car-right.png', speed, begin, end);
};
Car.prototype = Object.create(Enemy.prototype);

var Truck = function(x, y, speed, begin, end) {
    Enemy.call(this, x, y, 'images/truck-right-small.png', speed, begin, end);
};
Truck.prototype = Object.create(Enemy.prototype);

var Bug = function(x, y, speed, begin, end) {
    Enemy.call(this, x, y, 'images/enemy-bug.png', speed, begin, end);
};
Bug.prototype = Object.create(Enemy.prototype);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 505;
    this.y = 655;
    this.lives = 5;
};

Player.prototype.update = function() {

    if (this.y > 0 && this.y < 320) {
        for (i = 0; i < allHelpers.length; i++) {
            if (this.y + 53 === allHelpers[i].y && this.x >= allHelpers[i].x && this.x <= allHelpers[i].x + Resources.get(allHelpers[i].sprite).width) {
                this.x = allHelpers[i].x + Resources.get(allHelpers[i].sprite).width / 2 - Resources.get(this.sprite).width / 2;
            } else if (this.y + 53 === allHelpers[i].y) {
                this.restart();
                this.loseLife();
            }
        }
    } else if (this.y > 330 && this.y < 650) {
        for (i = 0; i < allEnemies.length; i++) {
            if (this.y - 12 === allEnemies[i].y && this.x >= allEnemies[i].x && this.x <= allEnemies[i].x + Resources.get(allEnemies[i].sprite).width) {
                this.restart();
                this.loseLife();
            }
        }
    } else if (this.y === -9) {
        console.log("Level Complete");
        this.restart();
        // Show level complete modal, click ok to start next level.
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(k) {
    if (k === 'left' && this.x > 0) {
        this.x = this.x - 101;
    } else if (k === 'right' && this.x < 1010) {
        this.x = this.x + 101;
    } else if (k === 'up' && this.y > 0) {
        this.y = this.y - 83;
    } else if (k === 'down' && this.y < 655) {
        this.y = this.y + 83;
    }
};

Player.prototype.restart = function() {
    this.x = 505;
    this.y = 655;
}

Player.prototype.loseLife = function() {
    // Lose one of 5 lives.
    this.lives--;

    // If on last life, show game over modal, click try again or exit. reset level to 1 and lives back to 5.
    if (this.lives <= 0) {
        // Show game over modal
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Truck(-101, 394, 500, -101, 1100), new Truck(505, 394, 500, -101, 1100), new Car(-101, 477, 750, -101, 1100), new Bug(-101, 560, 900, -101, 1100)];
var allHelpers = [new Log(202, 127, 300, -202, 1100), new Log(1111, 210, -500, 1110, -100), new Log(-101, 293, 400, -202, 1100)]
var allMovables = allHelpers.concat(allEnemies);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});