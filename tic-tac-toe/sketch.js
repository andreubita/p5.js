let board = [
    ['X', '', ''],
    ['', 'O', ''],
    ['', '', ''],
]

let players = ['X', 'O'];
let current_player;
let available = [];

function setup() { 
  createCanvas(400, 400);
  frameRate(30);
  current_player = floor(random(players.length));
  for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
          available.push([j, i]);
      }
  }
}

function draw() { 
  background(255);
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
}