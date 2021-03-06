// vars
var myGamePiece;
var planetaSelection = 'earth';
var planetbSelection;

var planetgravity = 0.5;
var gravityEarth = 0.5;
var gravityJupiter = 2.5;
var gravityPluto = 0.07;
var audioRate = gravityEarth;

var sound;
var soundLand;

// sound
sound = new Howl({
  src: ['short_whoosh.mp3'],
  autoplay: true,
  rate: gravityEarth,
  loop: true,
  volume: 0.8,
  onend: function() {
    console.log('Finished!');
  }
});

soundLand =  new Howl({
  src: ['woody_click.mp3'],
  autoplay: false,
  rate: 1,
  volume: 0.8 
})

function initGame() {
  console.log("initGame");
  myGamePiece = new component(50, 50, "red", 80, 75);
  myGameArea.init();
}

function startGame() {  
  myGameArea.start();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  init : function() {
    var planeta = document.getElementById("planetcanvascontainer");
    // this.canvas.width = 480;
    this.canvas.height = 470;
    this.context = this.canvas.getContext("2d");
    console.log(planeta);
    planetcanvascontainer.appendChild(this.canvas);
    updateGameArea();
  },
  start : function() {
      this.interval = setInterval(updateGameArea, 20);        
  },
  stop : function() {
      clearInterval(this.interval);
      sound.stop();
  },    
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y, type) {
  console.log("this" , this);
  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;    
  this.speedX = 0;
  this.speedY = 0;    
  this.gravity = planetgravity;
  this.gravitySpeed = 0;
  this.update = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
      this.gravitySpeed += planetgravity;
      this.x += this.speedX;
      this.y += this.speedY + this.gravitySpeed;
      this.hitBottom();
  }
  this.hitBottom = function() {
      var rockbottom = myGameArea.canvas.height - this.height;
      if (this.y > rockbottom) {
          this.y = rockbottom;
          sound.stop();
          soundLand.play();
          myGameArea.stop();
          landBottom();
      }
  }
}

function landBottom(){
  console.log("landBottom");
  populateSummaryText('Your mic dropped on ' + planetaSelection + ' in 3.27 seconds!');
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
}

function planetaChange(e){
  myGameArea.stop();
  myGameArea.clear();
  initGame();
  planetaSelection = e;
  if(e === "earth"){
    this.planetgravity = audioRate = gravityEarth;
    audioRate = 1.0;
  } else if (e === "jupiter") {
    this.planetgravity = audioRate = gravityJupiter;
    audioRate = 2.2;
  } else if (e === "pluto") {
    this.planetgravity = gravityPluto;
    audioRate = 0.3;
  }
  // sound
  sound = new Howl({
    src: ['short_whoosh.mp3'],
    autoplay: false,
    rate: audioRate,
    loop: true,
    volume: 0.8,
  });
}

function populateSummaryText(text) {
  document.getElementById('summarytext').innerHTML = text;
}

function resetGame(){
  console.log("resetGame");
  myGameArea.stop();
  myGameArea.clear();
  initGame();
  populateSummaryText("");
}

function dropthemic() {
  console.log("dropthemic");
  myGameArea.start();
  sound.play();
  populateSummaryText("dropping mic!");
}