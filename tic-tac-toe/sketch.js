var canvas;
var resultText;
var resetButton;

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

let players = ['X', 'O'];
let current_player;
let available = [];

function setup() { 
  canvas = createCanvas(400, 400);
  resultText = createP('');
  resetButton = createButton('RESET', 5);

  let xMidScreen = windowWidth / 2;
  let yMidScreen = windowHeight / 2;

  canvas.position(xMidScreen - width / 2, yMidScreen - height / 2);
  resultText.position(xMidScreen - 30, yMidScreen - height / 2 - 75);
  resetButton.position(xMidScreen - 50, yMidScreen + height / 2 + 20);

  resetButton.size(100, 40);
  resetButton.mouseReleased(reset);
  
  frameRate(30);
  current_player = floor(random(players.length));
  for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
          available.push([j, i]);
      }
  }
}

function reset(){
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  available = [];
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        available.push([j, i]);
    }
  }

  current_player = floor(random(players.length));
  resultText.html('');
  loop();
}

function draw() { 
  clear();
  //background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      let x = w * j + w / 2;
      let y = h * i + h / 2;
      let crt = board[j][i];
      textSize(32);
      let r = w / 4;
      if(crt == players[0]){
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }

      if(crt == players[1]){
        noFill();
        ellipse(x, y, r * 2);
      }
    }
  }

  let result = checkWinner();
  if(result != null){
    noLoop();
    resultText.style('font-size', '20pt');
    if(result == 'tie'){
      resultText.html('Tie!');
    }else{
      resultText.html(`${result} wins!`);
    }
  }
}

function win_line(l1, l2, l3){
  return l1 == l2 && l2 == l3 && l3 != '';
}

function checkWinner(){
  let winner = null;

  // Horizontal
  for(let i = 0; i < 3; i++){
      if(win_line(board[i][0], board[i][1], board[i][2])){
        winner = board[i][0];
      }
  }

  // Vertical
  for(let i = 0; i < 3; i++){
    if(win_line(board[0][i], board[1][i], board[2][i])){
      winner = board[0][i];
    }
  }

  // Diagonal
  if (win_line(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }else if (win_line(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed(){
  let x = floor(mouseX / (width / 3));
  let y = floor(mouseY / (height / 3));
  
  // Check valid spot
  if(x < 0 || x > 2 || y < 0 || y > 2) return;
  // Check if has not been played
  if(board[x][y] != '') return;

  // Remove spot from available slots for in case of tie
  let index = 0;
  for(let slot of available){
    if(slot[0] == x && slot[1] == y) available.splice(index, 1);
    index++;
  }

  board[x][y] = players[current_player];
  current_player = (current_player + 1) % players.length;
}