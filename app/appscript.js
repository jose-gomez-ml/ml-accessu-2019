// vars
console.log("yo");
var myGamePiece;
var planetaSelection;
var planetbSelection;

var planetgravity = 0.5;
var gravityEarth = 0.5;
var gravityJupiter = 2.5;
var gravityPluto = 0.01;

// var planeta = document.getElementById("hi");

function initGame() {
  console.log("initGame");
  myGamePiece = new component(30, 30, "red", 80, 75);
  myGameArea.init();
}

function startGame() {  
  myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    // canvas : document.getElementById("planetacanvas"),
    init : function() {
      var planeta = document.getElementById("planetcanvascontainer");
      // this.canvas.width = 480;
      this.canvas.height = 370;
      this.context = this.canvas.getContext("2d");
      console.log(planeta);
      // document.body.appendChild(this.canvas, document.getElementById("planeta"));
      planetcanvascontainer.appendChild(this.canvas);
      updateGameArea();
    },
    start : function() {
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    console.log("this" , planetgravity);
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
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function planetaChange(e){
  console.log("planetaChange", e);
  if(e === "earth"){
    this.planetgravity = gravityEarth;
  } else if (e === "jupiter") {
    this.planetgravity = gravityJupiter;
  } else if (e === "pluto") {
    this.planetgravity = gravityPluto;
  }
}

function dropthemic() {
  console.log("dropthemic");
  myGameArea.start();
}

// startGame();