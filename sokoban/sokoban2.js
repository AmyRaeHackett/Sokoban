"use strict";

var map = [
    0, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    0, 1, 1, 1, 0,
    0, 2, 1, 2, 0,
    0, 0, 0, 0, 0
];

//global variables
var tileWidth = 100;
var tileHeight = 100;
var mapHeight = 5;
var mapWidth = 5;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var owlX = tileWidth + 100;
var owlY = tileHeight;
var mouseX = tileWidth + 200;
var mouseY = tileHeight + 100;
var mouse2X = tileWidth;
var mouse2Y = tileHeight + 100;
var owl = document.createElement("img");
var mouse = document.createElement("img");
var mouse2 = document.createElement("img");
var count = 0;
var wallLeft = canvas.width - 400;
var wallRight = canvas.width - 200;
var wallBottom = canvas.width - 200;


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

    //call image function
    drawImage();

    //make event listener for when arrow is pressed so that the owl moving function is called
    window.addEventListener("keydown", moveSomething);

    // counting user's moves

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

            //stopping owl and mice from being able to hit the wall
            if ((owlX === wallLeft) || (mouseX === wallLeft) || (mouse2X === wallLeft)) {

                //do nothing
            }
            else if (owlX === mouseX && owlY === mouseY) {
                mouseX -= 100;
            }
            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2X -= 100;
            }
            else {
                owlX -= 100;
            }

            //hardcoded condition for section of wall in level 2
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlX+=100;
            }

            //redraw canvas
            makeGame();

            break;

        //up arrow
        case 38:
            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //owl conditions
            if ((owlY === wallLeft) || (mouseY === wallLeft) || (mouse2Y === wallLeft))  {
            }

            else if (owlX === mouseX && owlY === mouseY) {
                mouseY -= 100;
            }

            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2Y -= 100;
            }

            else {
                owlY -= 100;
            }

            //hardcoded condition for section of wall in level 2
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlY+=100;
            }


            //redraw canvas
            makeGame();

            break;

        //right
        case 39:

            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //owl conditions
            if ((owlX === wallRight) || (mouseX === wallRight) || (mouse2X === wallRight)) {
            }

            else if (owlX === mouseX && owlY === mouseY) {
                mouseX += 100;
            }

            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2X += 100;
            }

            else {
                owlX += 100;
            }

            //hardcoded condition for section of wall in level 2
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlX-=100;
            }


            //redraw canvas
            makeGame();

            break;

        //down
        case 40:

            //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //owl conditions
            if ((owlY === wallBottom) || (mouseY === wallBottom) || (mouse2Y === wallBottom)){

            }

            else if (owlX === mouseX && owlY === mouseY) {
                mouseY += 100;
            }

            else if (owlX === mouse2X && owlY === mouse2Y) {
                mouse2Y += 100;
            }

            else {
                owlY += 100;
            }

            //hardcoded condition for section of wall in level 2
            if ((owlX === 500 && owlY === 300) || (owlX === 500 && owlY === 400)) {
                owlY-=100;
            }


            //redraw canvas
            makeGame();

            break;
    }


    //winning condition for level 1, automatically load level 2 function
    if ((mouseX === 300 && mouseY === 300 && mouse2X === 100 && mouse2Y === 300) ||

        (mouse2X === 300 && mouse2Y === 300 && mouseX === 100 && mouseY === 300))
    {
        setTimeout(function () {
            $(".elements").hide();
            $("#winning").text(`You won with ${count} moves! Loading next level...`).css("padding-top", "5.5em");
        }, 600);

        setTimeout(levelTwo, 2000);
    }


    //winning condition for level 2
    if ((mouseX === 600 && mouseY === 300 || mouseX === 600 && mouseY === 400)  &&
        (mouse2X === 600 && mouse2Y === 400 || mouse2X === 600 && mouse2Y ===300)) {
        setTimeout(function () {
            $(".elements").hide();
            $("#winning2").text(`Congratulations, you won!`).css("padding-top", "5.5em");
        }, 600);
    }
    if (window.event.keyCode) {
        count++;
        $("#moves").text(`Moves: ${count} `);
    }




}





//level 2
function levelTwo() {
    $("#winning").hide();
    $(".elements").show();
    $("#levelChange").text("Level 2");
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

//owl goes behind mouse when mouse wants to move onto wall
// mice getting pushed on top of extra wall in level 2
// error when push a mouse and there's a mouse beside it
