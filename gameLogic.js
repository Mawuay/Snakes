var canvas, gameArea;

window.onload = function() {
    canvas = document.getElementById("canvas");
    gameArea = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);
    document.displayScore();

    // Render this animation X frames per second
    var frameRate = 14;
    setInterval(draw, 1000/ frameRate); 
};


// Snake 
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = snakeY = 10;


// Game world 
var gridSize = tileSize = 25; // 25 x 25 tiles == 900
var nextX = nextY = 0; // Initilizes the next x and Y posisitons of the snake 
var score = 0; 
// var highScore = localStorage.getItem();


// Apple 
var appleX = (appleY = 15);

//Draw 
function draw(){
    // Move the snake to the next position
    snakeX += nextX;
    snakeY += nextY;

    // Check if the snake is out of bounds 
    if (snakeX < 0){
        snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1){
        snakeX = 0;
    }
    if (snakeY < 0){
        snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1){
        snakeY = 0;
    }


    // Eating the apple 
    if (snakeX == appleX && snakeY == appleY){
        tailSize++;
        score++;
        appleX = Math.floor(Math.random()* gridSize);
        appleY = Math.floor(Math.random()* gridSize);
        
    }

    // Paint background 
    gameArea.fillStyle = "black";
    gameArea.fillRect(0,0, canvas.width, canvas.height);



    // Paint the snake 
    gameArea.fillStyle = "yellow";
    for (var i = 0 ; i < snakeTrail.length; i++){
        gameArea.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        // What happens when the snale bites its tail 
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY){
            tailSize = defaultTailSize;
            score = 0;
        }
    }

    // Paint apple 
    gameArea.fillStyle = "red";
    gameArea.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);



    // Set snake trail 
    snakeTrail.push ({x: snakeX, y: snakeY});
    while (snakeTrail.length > tailSize){
        snakeTrail.shift();
    }
}

// input
function keyDownEvent(e){
    switch (e.keyCode){
    case 37:
        nextX = -1;
        nextY = 0;
        break;
    case 38:
        nextX = 0;
        nextY = -1;
        break;
    case 39:
        nextX = 1;
        nextY = 0;
        break;
    case 40:
        nextX = 0;
        nextY = 1;
        break;    
    }
}

// text output
function displayScore(){
    // Displays the current score of the game  
    consolelog.(score);
}
