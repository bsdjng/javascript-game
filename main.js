const canvas = document.getElementById('blackjack');
const context = canvas.getContext('2d');

// Function to resize the canvas to fill the entire window

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.backgroundColor = 'rgb(51, 101, 77)';
context.fillRect(0, 10000, canvas.width, canvas.height);

// function startButtonPress(){
//     let lijst = ["steen", "papier", "schaar"];
//     var rnd = Math.floor(Math.random() * lijst.length);
//     console.error([lijst[rnd]]);
// }