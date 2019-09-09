"use strict";

//global variables

//level 1 map
var map = [
    0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 2, 0,
    0, 0, 0, 0, 0, 0, 0,
];

//canvas attributes
var tileWidth = 100;
var tileHeight = 100;
var mapHeight = 3;
var mapWidth = 7;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//characters
var owlX = tileWidth;
var owlY = tileHeight;
var mouseX = tileWidth + 100;
var mouseY = tileHeight;
var owl = new Image;
var mouse = new Image;

//user's moves
var count = 0;

//wall positions
var wallLeft = canvas.width - 600;
var wallRight = canvas.width - 200;
var wallBottom = canvas.width  - 600;

//mouse 2 is just for level 2+ so we just define its coordinates without giving them a value
var mouse2 = new Image;
var mouse2X;
var mouse2Y;


//once the page is loaded, run the game function
$(document).ready( function () {
    makeGame();
} );

function makeGame() {
// assigning array to the canvas to draw a board
    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {

            switch (map[((y * mapWidth) + x)]) {
                case 0:
                    ctx.fillStyle = "grey";
                    ctx.fill();
                    break;

                case 2:
                    ctx.fillStyle = "red";
                    ctx.fill();
                    break;

                default:
                    ctx.fillStyle = "moccasin";
                    ctx.fill();
            }
            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
        $("#text").text("Use the owl to move the mice into the red boxes, with the arrow keys on your keyboard.");
    }

    //call image function so that the characters are drawn
    drawImage();

    //make event listener for when arrow is pressed so that the owl moving function is called
    window.addEventListener("keydown", moveSomething);

}


//function for drawing the images
function drawImage() {
    owl.onload = function () {
        ctx.drawImage(owl, owlX, owlY, 100, 100);
    };
    owl.src = "owly.png";

    mouse.onload = function () {
        ctx.drawImage(mouse, mouseX, mouseY, 100, 100);
    };
    mouse.src = "mousey.png";

    mouse2.onload = function () {
        ctx.drawImage(mouse2, mouse2X, mouse2Y, 100, 100);
    };
    mouse2.src = "mousey.png";

}


//function for moving the owl and pushing the mice in the correct direction
function moveSomething() {
    switch (window.event.keyCode) {

        //left arrow
        case 37:

            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //move owl but not on to wall
            if (owlX === wallLeft) {
            }
            else {
                owlX -= 100;
            }


            //move first mouse but not on to wall or another mouse
            if (mouseX === wallLeft) {
            }

            else if (mouseX === mouse2X && mouseY === mouse2Y) {
                mouseX +=100;
                owlX +=200;
            }
            else if (owlX === mouseX && owlY === mouseY) {
                mouseX -= 100;
            }

            //move second mouse but not on to wall or another mouse
            if (mouse2X === wallLeft) {
            }

            else if (mouse2X === mouseX && mouse2Y === mouseY) {
                mouse2X +=100;
                owlX += 200;
            }

            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2X -= 100;
            }

            //hardcoded condition for section of wall in level 3
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlX+=100;
            }

            if ((mouseX === 500 && mouseY === 300) || (mouseX === 500 && mouseY === 400)) {
                mouseX+=100;
            }

            if ((mouse2X === 500 && mouse2Y === 300) || (mouse2X === 500 && mouse2Y === 400)) {
                mouse2X+=100;
            }

            //redraw canvas
            makeGame();

            break;

        //up arrow
        case 38:

            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //move owl but not on to wall
            if (owlY === wallLeft) {
            }
            else {
                owlY -= 100;
            }

            //move first mouse but not on to wall or another mouse
            if (mouseY === wallLeft) {

            }

            else if (mouseX === mouse2X && mouseY === mouse2Y){
                mouseY +=100;
                owlY +=200;
            }

            else if (owlX === mouseX && owlY === mouseY) {
                mouseY -= 100;
            }

            //move second mouse but not on to wall or another mouse
            if (mouse2Y === wallLeft) {

            }

            else if (mouse2X === mouseX && mouse2Y === mouseY) {
                mouse2Y += 100;
                owlY+=200;
            }

            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2Y -= 100;
            }

            //hardcoded condition for section of wall in level 3
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlY+=100;
            }

            if ((mouseX === 500 && mouseY === 300) || (mouseX === 500 && mouseY === 400)) {
                mouseY+=100;
            }

            if ((mouse2X === 500 && mouse2Y === 300) || (mouse2X === 500 && mouse2Y === 400)) {
                mouse2Y+=100;
            }

            //redraw canvas
            makeGame();

            break;

        //right arrow
        case 39:

            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //move owl but not on to wall
            if (owlX === wallRight) {
            }
            else {
                owlX += 100;
            }

            //move first mouse but not on to wall or another mouse
            if (mouseX === wallRight) {

            }

            else if (mouseX === mouse2X && mouseY === mouse2Y) {
                mouseX-=100;
                owlX-=200;
            }

            else if (owlX === mouseX && owlY === mouseY) {
                mouseX += 100;
            }

            //move second mouse but not on to wall or another mouse
            if (mouse2X === wallRight) {
            }

            else if (mouse2X === mouseX && mouse2Y === mouseY) {
                mouse2X -=100;
                owlX -=200;

            }
            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2X += 100;
            }

            //hardcoded condition for section of wall in level 3
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlX-=100;
            }

            if ((mouseX === 500 && mouseY === 300) || (mouseX === 500 && mouseY === 400)) {
                mouseX-=100;
            }

            if ((mouse2X === 500 && mouse2Y === 300) || (mouse2X === 500 && mouse2Y === 400)) {
                mouse2X-=100;
            }

            //redraw canvas
            makeGame();

            break;

        //down arrow
        case 40:

            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //move owl but not on to wall
            if (owlY === wallBottom) {
            }
            else {
                owlY += 100;
            }

            //move first mouse but not on to wall or another mouse
            if (mouseY === wallBottom)  {

            }

            else if (mouseX === mouse2X && mouseY === mouse2Y) {
                mouseY -=100;
                owlY-=200;
            }
            else if (owlX === mouseX && owlY === mouseY) {
                mouseY += 100;
            }

            //move second mouse but not on to wall or another mouse
            if (mouse2Y === wallBottom){

            }

            else if (mouse2X === mouseX && mouse2Y === mouseY) {
                mouse2Y -=100;
                owlY-=200;
            }
            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2Y += 100;
            }

            //hardcoded condition for section of wall in level 3
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlY-=100;
            }

            if ((mouseX === 500 && mouseY === 300) || (mouseX === 500 && mouseY === 400)) {
                mouseY-=100;
            }

            if ((mouse2X === 500 && mouse2Y === 300) || (mouse2X === 500 && mouse2Y === 400)) {
                mouse2Y-=100;
            }

            //redraw canvas
            makeGame();

            break;
    }


    //winning condition for level 1, automatically load level 2 function
    if (mouseX === 500 && mouseY === 100 ) {
        setTimeout(function () {
            $(".elements").hide();
            $("#winning").text(`You won with ${count} moves! Loading next level...`).css("padding-top", "5.5em");
        }, 600);

        setTimeout(levelTwo, 2000);

    }
    //winning condition for level 2, automatically load level 3 function
    if ((mouseX === 300 && mouseY === 300 && mouse2X === 100 && mouse2Y === 300) ||

        (mouse2X === 300 && mouse2Y === 300 && mouseX === 100 && mouseY === 300))
    {
        setTimeout(function () {
            $(".elements").hide();
            $("#winning1").text(`You won with ${count} moves! Loading next level...`).css("padding-top", "5.5em");
        }, 600);

        setTimeout(levelThree, 2000);
    }


    //winning condition for level 3, end of game
    if ((mouseX === 600 && mouseY === 300 || mouseX === 600 && mouseY === 400)  &&
        (mouse2X === 600 && mouse2Y === 400 || mouse2X === 600 && mouse2Y ===300)) {
        setTimeout(function () {
            $(".elements").hide();
            $("#winning1").hide();
            $("#winning2").text(`Congratulations, you won!`).css("padding-top", "5.5em");
            $("#refresh").text(`Refresh the page to play again.`).css("padding-top", "3.5em")
        }, 600);
    }


    // counting user's moves
    if (window.event.keyCode) {
        count++;
        $("#moves").text(`Moves: ${count} `);
    }

}



//level 2 function
function levelTwo() {
    $("#winning").hide();
    $(".elements").show();
    $("#levelChange").text("Level 2");
    $("#moves").text("Moves:");

    // variable changes made

    map = [
        0, 0, 0, 0, 0,
        0, 1, 1, 1, 0,
        0, 1, 1, 1, 0,
        0, 2, 1, 2, 0,
        0, 0, 0, 0, 0
    ];


    mapHeight = 5;
    mapWidth = 5;
    owlX = tileWidth + 100;
    owlY = tileHeight;
    mouseX = tileWidth + 200;
    mouseY = tileHeight + 100;
    ctx.canvas.height = 500;
    ctx.canvas.width = 500;
    count = 0;
    wallLeft = canvas.width - 400;
    wallRight = canvas.width - 200;
    wallBottom = canvas.width - 200;
    mouse2X = tileWidth;
    mouse2Y = tileHeight + 100;

    makeGame();


}


//level 3 function
function levelThree() {
    $("#winning").hide();
    $("#winning1").hide();
    $(".elements").show();
    $("#levelChange").text("Level 3");
    $("#moves").text("Moves:");

    // variable changes made

    map = [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 0, 2, 0,
        0, 1, 1, 1, 1, 0, 2, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ];

    ctx.canvas.height = 600;
    ctx.canvas.width = 800;
    mapHeight = 6;
    mapWidth = 8;
    mouse2X = tileWidth + 300;
    mouse2Y = tileHeight + 200;
    count = 0;
    wallLeft = canvas.width-700;
    wallRight = canvas.width - 200;
    wallBottom = canvas.width - 400;

    makeGame();

}