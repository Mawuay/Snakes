var canvas, gameArea;

window.onload = function() {
    canvas = document.getElementById("canvas");
    gameArea = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);
    

    // Render this animation X frames per second
    var frameRate = 13;
    setInterval(draw, 1000/ frameRate); 
};


// Snake 
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = snakeY = 10;


// Game world 
var gridSize = tileSize = 25; // 25 x 25 tiles == 625
var nextX = nextY = 0; // Initializes the next x and Y positions of the snake 
var score = 0; 
var highScore = localStorage.getItem("HighScore");



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
        // Updates the  local storage with the new high score
        if (parseInt(score,10) > parseInt(highScore,10)){
            localStorage.clear("HighScore");
            localStorage.setItem("HighScore", score);
            // score = 0;
        }
        appleX = Math.floor(Math.random()* gridSize);
        appleY = Math.floor(Math.random()* gridSize);
        
    }
                


    // Paint background 
    gameArea.fillStyle = "black";
    gameArea.fillRect(0,0, canvas.width, canvas.height);



    // Paint the snake 
    gameArea.fillStyle = "green";
    for (var i = 0 ; i < snakeTrail.length; i++){
        gameArea.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        // What happens when the snake bites its tail 
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY){
            tailSize = defaultTailSize;

            // Updates the  local storage with the new high score
            if (parseInt(score,10) > parseInt(highScore,10)){
                localStorage.clear("HighScore");
                localStorage.setItem("HighScore", score);
                score = 0;
            }else{
                score = 0;
                // break;
            }

            console.log("GameOver :(");
            // displayGameover();
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

    displayScore();
   
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
    console.log(score);
    gameArea.font = '20px digital-7';
    gameArea.fillStyle = "white";
    gameArea.fillText("Score : " + String(score), 50,50);
    if (highScore == "") {
        localStorage.setItem("HighScore", score);
    }
    gameArea.fillText("Highscore : " + localStorage.getItem("HighScore"), 475, 50 );

}


function displayGameover(){
    // Displays the game over screen once the once the snake bites its tail.
    // game over display 
    gameArea.font = '72px digital-7';
    gameArea.fillStyle="white";
    gameArea.fillText("GameOver", 185,312);

}

