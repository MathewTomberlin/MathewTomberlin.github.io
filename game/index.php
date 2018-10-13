<?php
    session_start();
?>

<html>
    <head>
        <title>Snake</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <style type="text/css">
            body {
                background-color: silver;
            }
            #startMenu {
                position: relative;
                width: 500px;
                height: 300px;
                margin: 0 auto;
                background-color: black;
                background-image: url("starfield.png");
                color: white;
            }
            #gameWindow {
                position: relative;
                width: 1900px;
                height: 900px;
                margin: 0 auto;
                background-color: black;
                background-image: url("starfield.png");
                color: white;
            }
            #snakeHead {
                position: absolute;
                width: 25px;
                height: 25px;
                top: 10px;
                left: 5px;
            }
            
            .pellet, .tail, .enemy {
                position: absolute;
                width: 25px;
                height: 25px;
                top: 10px;
                left: 5px;
            }
            .button {
                color: black;
                background-color:#FF6600;
                border-radius:8px;
                text-align:center;
                font-size:30px;
                font-family: "Lucida Console", Monaco, monospace;
                cursor:hand;
                cursor:pointer;
            }
            .noSelect {
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select:none;
                -o-user-select:none;
                -khtml-user-select:none;
            }
            #startBtn {
                position: absolute;
                width: 100px;
                height: 40px;
                bottom: 50%;
                left: 40%;
            }
            #instructionsBtn {
                position: absolute;
                width: 225px;
                height: 40px;
                bottom: 30%;
                left: 30%;
            }
            #points {
                font-size:24px;
            }
            #upBtn {
                position: absolute;
                width: 25px;
                height: 25px;
                bottom: 60px;
                right: 35px;
            }
            #downBtn {
                position: absolute;
                width: 25px;
                height: 25px;
                bottom: 10px;
                right: 35px;
            }
            #leftBtn {
                position: absolute;
                width: 25px;
                height: 25px;
                bottom: 35px;
                right: 60px;
            }
            #rightBtn {
                position: absolute;
                width: 25px;
                height: 25px;
                bottom: 35px;
                right: 10px;
            }
            
            #log{
                position: absolute;
                top: 5px;
                right: 5px;
            }
            
            #title {
                position: absolute;
                width: 400px;
                height: 30px;
                bottom: 70%;
                font-size:48px;
                left: 25%;
            }
            
            #instructions{
                position: absolute;
                width: 500px;
                height: 400px;
                top: 45%;
                font-size:20px;
                left: 12%;
            }
        </style>
    </head>
    <body onload="getHighscore()">
            <div id="gameWindow">
                <div id="points">Highscore: 0</div>
                <div id="startMenu">
                    <h1 id="title">Super Snake</h1>
                    <div id="startBtn" class="button noSelect" onClick="startGame();">Start</div>
                    <div id="instructionsBtn" class="button noSelect" onClick="showInstructions();">Instructions</div>
                </div>
            </div>
        <script>
        function Point(x, y) {
          this.x = x;
          this.y = y;
        }
            var headPositionX= 100;
            var headPositionY = 100;
            var playerHealth = 100;
            var facingX = 0;
            var facingY = 0;
            var speed = 1;
            var numPellets = 0;
            var points=0;
            var pellets = [];
            var length = 0;
            var tail = [];
            var gameTimer;
            var gameState = "Starting";
            var angle = 0;
            var lastUpdate;
            var numEnemies = 0;
            var enemies = [];
            var inc = 0;
            
            document.addEventListener("keyup", function(event){
                if(gameState!="Starting"){
                    switch(event.keyCode){
                        case 37:
                            if(facingX<=0)
                                moveLeft();
                            break;
                        case 38:
                            if(facingY<=0)
                                moveUp();
                            break;
                        case 39:
                            if(facingX>=0)
                                moveRight();
                            break;
                        case 40:
                            if(facingY>=0)
                                moveDown();
                            break;
                    }
                }
            });
            
            function moveUp(){
                facingY = -1;
                facingX = 0;
                angle = 0;
                document.getElementById("snakeHead").setAttribute('style', 'transform:rotate(0deg);z-index:-1;');
            }
            
            function moveDown(){
                facingY = 1;
                facingX = 0;
                angle = 180;
                document.getElementById("snakeHead").setAttribute('style', 'transform:rotate(180deg);z-index:-1;');
            }
            
            function moveLeft(){
                facingY = 0;
                facingX = -1;
                angle = 270;
                document.getElementById("snakeHead").setAttribute('style', 'transform:rotate(270deg);z-index:-1;');
            }
            
            function moveRight(){
                facingY = 0;
                facingX = 1;
                angle = 90;
                document.getElementById("snakeHead").setAttribute('style', 'transform:rotate(90deg);z-index:-1;');
            }
            
            function incrementPoints(amount){
                points+=amount;
                $("#points").html("Score: "+points);
            }
            
            function startGame(){
                $("#gameWindow").empty();
                
                $("#gameWindow").append('<img id="snakeHead" src="greenhead.png">');
                $("#gameWindow").append('<div id="points"></div>');
                
                document.getElementById('snakeHead').style.top = headPositionY;
                document.getElementById('snakeHead').style.left = headPositionX;
                
                gameState = "Running";
                
                numPellets = 0;
                speed = 1;
                points = 0;
                incrementPoints(0);
                
                gameTimer = setInterval(gameLoop,0);
                //setInterval(spawnEnemy,3000);
                lastUpdate = Date.now();
            }
            
            function getHighscore(){
                $.ajax({
                   type: "POST",
                   url: "highscore.php",
                   datatype:'json',
                   data: { highscore: points },
                   success: function(data) {
                        points = data;
                        $("#points").html("Highscore: "+points);
                   }
                });
            }
            
            function endGame(){
                clearInterval(gameTimer);
                    
                    $("#gameWindow").empty();
                    
                    gameState = "Starting";
                    headPositionX= 100;
                    headPositionY = 100;
                    facingX = 0;
                    facingY = 0;
                    speed = 1;
                    length=0;
                    tail = [];
                    pellets = [];
                    numPellets=0;
                    gameTimer = 0;
                    
                    getHighscore();
                    
                    $("#gameWindow").append('<div id="startMenu"><h1 id="title">Super Snake</h1><div id="startBtn" class="button noSelect" onClick="startGame();">Start</div><div id="instructionsBtn" class="button noSelect" onClick="showInstructions();">Instructions</div></div>');
                    $("#gameWindow").prepend('<div id="points">Score: '+points+'</div>');
            }
            
            function showInstructions(){
                $("#gameWindow").empty();
                $("#gameWindow").append('<div id="startMenu"><h1 id="title">Super Snake</h1><div id="startBtn" class="button noSelect" onClick="startGame();">Start</div><p id="instructions">Use the arrow keys to move.<br><br> Pickup pellets for points and to grow your tail.<br><br> Watch out for your tail and the walls!<br><br>Game saves your highscore!</p></div>');
            }
            
            function pickupPellet(i){
                incrementPoints(10);
                numPellets-=1;
                speed+=0.01;
                if(numPellets < 0){
                    numPellets=0;
                }
                pellets.splice(i,1);
                $(".pellet").remove();
                
                addTailSegment();
            }
            
            function addTailSegment(){
                //Add tail segment behind last segment (or head)
                if(length>0){
                    var xDir = (length==1)?headPositionX-tail[length-1].x:tail[length-2].x-tail[length-1].x;
                    var yDir = (length==1)?headPositionY-tail[length-1].y:tail[length-2].y-tail[length-1].y;
                    tail.push(new Point(tail[length-1].x,tail[length-1].y));
                    $("#gameWindow").append('<img id="tail'+length+'" class="tail" src="greenball.png">');
                    document.getElementById("tail"+length).style.left = tail[length].x;
                    document.getElementById("tail"+length).style.top = tail[length].y;
                } else {
                    tail.push(new Point(headPositionX,headPositionY));
                    $("#gameWindow").append('<img id="tail'+length+'" class="tail" src="greenball.png">');
                    document.getElementById("tail"+length).style.left = tail[length].x;
                    document.getElementById("tail"+length).style.top = tail[length].y;
                }
                
                length++;
            }
            
            function updateTailPosition(){
                //Update each of the tail segment positions so that it follows the one in front of it (or the head)
                for(var i = 0; i < length; i++){
                    var prevX = (i>0)?tail[i-1].x:headPositionX;
                    var prevY = (i>0)?tail[i-1].y:headPositionY;
                    var faceX = (i>0)?tail[i].x-tail[i-1].x:tail[i].x-headPositionX;
                    var faceY = (i>0)?tail[i].y-tail[i-1].y:tail[i].y-headPositionY;
                    var mag = Math.sqrt(Math.pow(faceX,2)+Math.pow(faceY,2));
                    tail[i].x=prevX+((faceX/mag)*50);
                    tail[i].y=prevY+((faceY/mag)*50);
                    document.getElementById('tail'+i).style.left = tail[i].x;
                    document.getElementById('tail'+i).style.top = tail[i].y;
                    
                    //Collided with tail
                    if(Math.abs((tail[i].x+12)-(headPositionX+12))<=20 && Math.abs((tail[i].y+12)-(headPositionY+12)) <= 20){
                        endGame();
                    }
                }
            }
            
            /*function updateEnemyPosition(now){
                for(var i = 0; i < numEnemies; i++){
                    enemies[i].x-=0.25;
                    var y=50*Math.sin(enemies[i].x/50);
                    document.getElementById('enemy'+i).style.left = enemies[i].x;
                    document.getElementById('enemy'+i).style.top = enemies[i].y+y;
                    if(numEnemies>0){
                        if(enemies[i].x <= 0){
                            enemies.splice(i,1);
                            $("#enemy"+i).remove();
                            numEnemies--;
                        }
                    }
                }
            }*/
            
            function spawnPellet(){
                if(numPellets <= 0){
                    pellets.push(new Point(Math.random()*1875,Math.random()*875));
                    numPellets=1;
                    
                    $("#gameWindow").append('<img id="pellet'+numPellets+'" class="pellet" src="blueball.png">');
                    document.getElementById('pellet'+numPellets).style.left = pellets[0].x;
                    document.getElementById('pellet'+numPellets).style.top = pellets[0].y;
                }
            }
            
            /*function spawnEnemy(){
                if(numEnemies <= 3){
                    enemies.push(new Point(1875,Math.random()*875));
                    
                    $("#gameWindow").append('<img id="enemy'+numEnemies+'" class="enemy" src="yellowball.png">');
                    document.getElementById('enemy'+numEnemies).style.left = enemies[0].x;
                    document.getElementById('enemy'+numEnemies).style.top = enemies[0].y;
                    numEnemies+=1;
                }
            }*/
            
            function updateHeadPosition(){
                document.getElementById("snakeHead").setAttribute('style', 'transform:rotate('+angle+'deg);z-index:1;');
                headPositionX = headPositionX+(speed*facingX);
                headPositionY = headPositionY+(speed*facingY);
                
                document.getElementById('snakeHead').style.left = headPositionX;
                document.getElementById('snakeHead').style.top = headPositionY;
            }
            
            function gameLoop(){
                
                var now = Date.now();
                var dt = now - lastUpdate;
                lastUpdate = now;
                inc+=0.1;
                
                updateHeadPosition();
                
                spawnPellet();
                
                if(headPositionX < -20 || headPositionX > 1880 || headPositionY < -20 || headPositionY > 880){
                    endGame();
                }
                
                updateTailPosition();
                //updateEnemyPosition(now)
                
                //If the head collides with a pellet, remove the pellet, increment the speed and add a tail segment behind the last segment (or head)
                for(var i = 0; i < numPellets; i++){
                    if(Math.abs((pellets[i].x+12)-(headPositionX+12))<=20 && Math.abs((pellets[i].y+12)-(headPositionY+12)) <= 20){
                        pickupPellet(i);
                    }
                }
            }
        </script>
    </body>
</htm>