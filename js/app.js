var allHelpers = [],
    allEnemies = [],
    allMovables = [],
    allHelpersLen,
    allEnemiesLen;

var Game = function() {
    // An array of Howl objects containing the sound effects files used in the game.
    this.sounds = [new Howl({
            src: ['sounds/splash.mp3']
        }),
        new Howl({
            src: ['sounds/squish.wav']
        }),
        new Howl({
            src: ['sounds/levelComplete.mp3']
        }),
        new Howl({
            src: ['sounds/winner.wav']
        }),
        new Howl({
            src: ['sounds/gameOver.mp3']
        })
    ];

    this.livesInfoElement = document.getElementById("lives");
    this.levelInfoElement = document.getElementById("level");

    // All enemy objects are defined in an array of arrays called levelEnemies, each element of the levelEnemies array contains
    // an array of enemy objects which corresponds to a different level of difficulty.  Level 1 is element 0, level 2 is element 1 and so on...
    this.levelEnemies = [
        [new Truck(-101, 394, 300, -101, 1100), new Car(-101, 477, 400, -101, 1100), new Sedan(-171, 560, 500, -101, 1100)],
        [new Truck(-101, 394, 500, -101, 1100), new Car(-101, 477, 600, -101, 1100), new Sedan(-171, 560, 700, -101, 1100)],
        [new Truck(-101, 394, 400, -101, 1100), new Truck(505, 394, 400, -101, 1100), new Car(-101, 477, 500, -101, 1100), new Sedan(-171, 560, 600, -101, 1100)],
        [new Truck(-101, 394, 500, -101, 1100), new Truck(505, 394, 500, -101, 1100), new Car(-101, 477, 600, -101, 1100), new Sedan(-171, 560, 700, -101, 1100)],
        [new Truck(-101, 394, 300, -101, 1100), new Truck(505, 394, 300, -101, 1100), new Car(-101, 477, 400, -101, 1100), new Car(505, 477, 400, -101, 1100), new Sedan(-171, 560, 500, -101, 1100)],
        [new Truck(-101, 394, 400, -101, 1100), new Truck(505, 394, 400, -101, 1100), new Car(-101, 477, 500, -101, 1100), new Car(505, 477, 500, -101, 1100), new Sedan(-171, 560, 600, -101, 1100)],
        [new Truck(-101, 394, 500, -101, 1100), new Truck(505, 394, 500, -101, 1100), new Car(-101, 477, 600, -101, 1100), new Car(505, 477, 600, -101, 1100), new Sedan(-171, 560, 700, -101, 1100)],
        [new Truck(-101, 394, 300, -101, 1100), new Truck(330, 394, 300, -101, 1100), new Truck(660, 394, 300, -101, 1100), new Car(-101, 477, 400, -101, 1100), new Car(330, 477, 400, -101, 1100), new Car(660, 477, 400, -101, 1100), new Sedan(-171, 560, 500, -101, 1100)],
        [new Truck(-101, 394, 400, -101, 1100), new Truck(330, 394, 400, -101, 1100), new Truck(660, 394, 400, -101, 1100), new Car(-101, 477, 500, -101, 1100), new Car(330, 477, 500, -101, 1100), new Car(660, 477, 500, -101, 1100), new Sedan(-171, 560, 700, -101, 1100)],
        [new Truck(-101, 394, 500, -101, 1100), new Truck(330, 394, 500, -101, 1100), new Truck(660, 394, 500, -101, 1100), new Car(-101, 477, 600, -101, 1100), new Car(330, 477, 600, -101, 1100), new Car(660, 477, 600, -101, 1100), new Sedan(-171, 560, 500, -101, 1100), new Sedan(505, 560, 500, -101, 1100)]
    ];

    // All helper objects are defined in an array of arrays called levelHelpers, each element of the levelHelpers array contains
    // an array of helper objects which corresponds to a different level of difficulty.  Level 1 is element 0, level 2 is element 1 and so on...
    this.levelHelpers = [
        [new Log(202, 127, 250, -202, 1100), new Log(1111, 210, -300, 1110, -100), new Log(-101, 293, 350, -202, 1100)],
        [new Log(202, 127, 350, -202, 1100), new Log(1111, 210, -400, 1110, -100), new Log(-101, 293, 450, -202, 1100)],
        [new Log(202, 127, 450, -202, 1100), new Log(1111, 210, -500, 1110, -100), new Log(-101, 293, 550, -202, 1100)],
        [new Log(202, 127, 350, -202, 1100), new Turtle(1111, 210, -400, 1110, -100), new Log(-101, 293, 450, -202, 1100)],
        [new Log(202, 127, 450, -202, 1100), new Turtle(1111, 210, -500, 1110, -100), new Log(-101, 293, 550, -202, 1100)],
        [new Log(202, 127, 350, -202, 1100), new Turtle(1111, 210, -400, 1110, -100), new Turtle(-101, 293, 450, -202, 1100)],
        [new Log(202, 127, 450, -202, 1100), new Turtle(1111, 210, -500, 1110, -100), new Turtle(-101, 293, 550, -202, 1100)],
        [new Turtle(202, 127, 350, -202, 1100), new Turtle(1111, 210, -400, 1110, -100), new Turtle(-101, 293, 450, -202, 1100)],
        [new Turtle(202, 127, 450, -202, 1100), new Turtle(1111, 210, -500, 1110, -100), new Turtle(-101, 293, 550, -202, 1100)],
        [new Turtle(202, 127, 450, -202, 1100), new Turtle(1111, 210, -500, 1110, -100), new Turtle(-101, 293, 550, -202, 1100)]
    ];
};

// A function to update the allEnemies, allHelpers, and allMovables variables if the players level is advanced.
Game.prototype.updateDifficulty = function(num, message, level, imgSrc) {
    if (num) {
        this.sounds[num].play();
    }
    showModal(message, imgSrc);
    allEnemies = this.levelEnemies[level];
    allHelpers = this.levelHelpers[level];
    allMovables = allHelpers.concat(allEnemies);
    allEnemiesLen = allEnemies.length;
    allHelpersLen = allHelpers.length;
};

// Super Class for defining common properties to all auto moving objects in the game
var Movables = function(x, y, sprite, speed, beginPos, endPos) {

    // The image/sprite for our movables, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
    this.beginPos = beginPos;
    this.endPos = endPos;
};

// Super Class for defining common properties to all enemy objects our player must avoid, also a subClass
// to the Movables Class
var Enemy = function(x, y, sprite, speed, beginPos, endPos) {
    Movables.call(this, x, y, sprite, speed, beginPos, endPos);
};
Enemy.prototype = Object.create(Movables.prototype);

// Super Class for defining common properties to all helper objects our player must use, also a subClass
// to the Movables Class
var Helper = function(x, y, sprite, speed, beginPos, endPos) {
    Movables.call(this, x, y, sprite, speed, beginPos, endPos);
};
Helper.prototype = Object.create(Movables.prototype);

// Update the movables' position, required method for game
// Parameter: dt, a time delta between ticks
Movables.prototype.update = function(dt) {
    // Multiplying any movement by the dt parameter
    // to ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.endPos < this.beginPos && this.x < this.endPos) {
        this.x = this.beginPos;
    } else if (this.endPos > this.beginPos && this.x > this.endPos) {
        this.x = this.beginPos;
    }
};

// Draw the Movable on the screen, required method for game
Movables.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// A subClass to the Helper Class to define a unique type of helper
var Log = function(x, y, speed, beginPos, endPos) {
    Helper.call(this, x, y, 'images/log.png', speed, beginPos, endPos);
};
Log.prototype = Object.create(Helper.prototype);

// A subClass to the Helper Class to define a unique type of helper
var Turtle = function(x, y, speed, beginPos, endPos) {
    Helper.call(this, x, y, 'images/turtle.png', speed, beginPos, endPos);
};
Turtle.prototype = Object.create(Helper.prototype);

// A subClass to the Enemy Class to define a unique type of enemy
var Car = function(x, y, speed, beginPos, endPos) {
    Enemy.call(this, x, y, 'images/car-right.png', speed, beginPos, endPos);
};
Car.prototype = Object.create(Enemy.prototype);

// A subClass to the Enemy Class to define a unique type of enemy
var Truck = function(x, y, speed, beginPos, endPos) {
    Enemy.call(this, x, y, 'images/truck-right-small.png', speed, beginPos, endPos);
};
Truck.prototype = Object.create(Enemy.prototype);

// A subClass to the Enemy Class to define a unique type of enemy
var Sedan = function(x, y, speed, beginPos, endPos) {
    Enemy.call(this, x, y, 'images/sedan.png', speed, beginPos, endPos);
};
Sedan.prototype = Object.create(Enemy.prototype);

var game = new Game();
// A Class to define the player object and the player object's properties initial states.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 505;
    this.y = 655;
    this.lives = 5;
    this.level = 1;
    this.onHelper = false;
    this.onHelperNum = null;
};

Player.prototype.update = function() {

    if (this.y > 0 && this.y < 320) {
        this.checkForHelpers();
    } else if (this.y > 330 && this.y < 650) {
        this.checkForCollisions();
    } else if (this.y === -9) {
        this.advanceLevel();
    }
};

// A method to detect if an enemy sprite is at the same position as the player sprite
Player.prototype.checkForCollisions = function() {
    for (i = 0; i < allEnemiesLen; i++) {
        if (this.y - 12 === allEnemies[i].y && this.x >= allEnemies[i].x && this.x <= allEnemies[i].x + Resources.get(allEnemies[i].sprite).width) {
            this.loseLife(1);
        }
    }
};

// A method to detect if the helper sprites are at the same position as the player sprite
Player.prototype.checkForHelpers = function() {
    for (i = 0; i < allHelpersLen; i++) {
        if (this.onHelper && this.onHelperNum === i) {
            if (allHelpers[i].x < -100 || allHelpers[i].x > 1211 - Resources.get(allHelpers[i].sprite).width) {
                this.loseLife(0);
            } else {
                this.x = allHelpers[i].x + Resources.get(allHelpers[i].sprite).width / 2 - Resources.get(this.sprite).width / 2;
            }
        } else {
            if (this.y + 53 === allHelpers[i].y && this.x >= allHelpers[i].x && this.x <= allHelpers[i].x + Resources.get(allHelpers[i].sprite).width) {
                this.setHelper(true, i);
                this.x = allHelpers[i].x + Resources.get(allHelpers[i].sprite).width / 2 - Resources.get(this.sprite).width / 2;
            } else if (this.y + 53 === allHelpers[i].y) {
                this.loseLife(0);
            }
        }
    }
};

// A method to advance the player to a more difficult level if the player makes it to the top position.  If the player
// has completed all the levels then the player has won the game and the game starts over.
Player.prototype.advanceLevel = function() {
    if (this.level < game.levelEnemies.length) {
        game.updateDifficulty(2, "Level " + (this.level) + " Complete!", this.level, "images/Star.png");
        this.level++;
    } else {
        //All levels completed, Player has won the game.
        game.updateDifficulty(3, "WINNER!!!   All levels Complete!", 0, "images/trophy.png");
        this.reset();
    }
    // Restart player and show modal.
    this.restart();
};

// Renders the player to the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Key press input handler.  Changes player sprite location in direction of key pressed.
Player.prototype.handleInput = function(k) {
    if (k === 'left' && this.x > 0) {
        this.x = this.x - 101;
    } else if (k === 'right' && this.x < 1010) {
        this.x = this.x + 101;
    } else if (k === 'up' && this.y > 0) {
        this.setHelper();
        this.y = this.y - 83;
    } else if (k === 'down' && this.y < 655) {
        this.setHelper();
        this.y = this.y + 83;
    }
};

// A method to set player onHelper status.  Used to define if player is on a helper and if so
// the index number of the helper the player is on.
Player.prototype.setHelper = function(status, num) {
    if (status) {
        this.onHelper = status;
        this.onHelperNum = num;
    } else {
        this.onHelper = false;
        this.onHelperNum = null;
    }

};

// A method to position the player at the start position, resets the players onHelper properties, 
// and updates info display.
Player.prototype.restart = function() {
    this.setHelper();
    this.x = 505;
    this.y = 655;
    game.livesInfoElement.innerHTML = this.lives;
    game.levelInfoElement.innerHTML = this.level;
};

Player.prototype.reset = function() {
    this.level = 1;
    this.lives = 5;
};

// A method to decrease the players lives.  If player is out of lives triggers game over and restart.
Player.prototype.loseLife = function(num) {
    // Lose one of 5 lives.
    game.sounds[num].play();
    this.lives--;

    // If on last life, show game over modal and reset level to 1 and lives back to 5.
    if (this.lives <= 0) {
        this.reset();
        game.updateDifficulty(4, "GAME OVER!", 0, "images/fail.gif");
    }
    this.restart();
};

// Calling the updateLevel function to initialize the allEnemies, allHelpers, and allMovables variables.
game.updateDifficulty(null, 'Press "ENTER" to start', 0, "images/start.png");

var player = new Player();
// This listens for key presses and sends the keys to the
// handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Only allow player movement if the modal is not showing.  If the modal is showing enable the "Enter" key
    // to close the modal.
    if (_modal.style.display == "none") {
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (e.keyCode === 13) {
        _modal.style.display = "none";
    } else if (e.keyCode === 13) {
        close_modal(clear);
    }
});
