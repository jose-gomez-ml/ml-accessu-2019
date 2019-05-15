// vars
var theFallingObject;
var planetgravity = 0.5;
var audioRate = 1.0;  // 0.1 - 4 changes the rate of playback
var sound;

sound_whoosh = new Howl({
  src: ['short_whoosh.wav'],
  autoplay: true,
  rate: planetgravity,
  loop: true,
  volume: 0.8,
  onend: function() {
    //console.log('Finished!');
  }
});
// example sound calls
// sound_whoosh.play();
// sound_whoosh.stop();


function initSim() {
  console.log("initSim");
  theFallingObject = new fallingObject(50, 50, "green", 80, 75);
  mySimArea.init();
}

function startSim() {  
  mySimArea.start();
}

var mySimArea = {
  canvas : document.createElement("canvas"),
  init : function() {
    var canvascontainer = document.getElementById("canvascontainer");
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.context = this.canvas.getContext("2d");
    canvascontainer.appendChild(this.canvas);
    updateSimArea();
  },
  start : function() {
      this.interval = setInterval(updateSimArea, 20);        
  },
  stop : function() {
      clearInterval(this.interval);
  },    
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function fallingObject(width, height, color, x, y, type) {
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
      ctx = mySimArea.context;
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
      var rockbottom = mySimArea.canvas.height - this.height;
      if (this.y > rockbottom) {
          this.y = rockbottom;
          mySimArea.stop();
          landBottom();
      }
  }
}

function landBottom(){
  console.log("landBottom");
}

function updateSimArea() {
  mySimArea.clear();
  theFallingObject.newPos();
  theFallingObject.update();
}

function inputChange(e){
  // what will change when the user alters the input? set new weights, gravity, or play sounds. wire this function into your UI controls

}

function populateSummaryText(text) {
  //wire this helper function to populate an aria-live=assertive region and announce custom crafted summaries to screenreaders
  document.getElementById('summarytext').innerHTML = text;
}

function resetSim(){
  console.log("resetSim");
  mySimArea.stop();
  mySimArea.clear();
  initSim();
  populateSummaryText("");
}

function startSim() {
  console.log("start Sim");
  mySimArea.start();
}