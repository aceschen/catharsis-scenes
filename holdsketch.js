let jetbrains;
let value = 0;

let objects = [];

function preload() {
  // sceneText = loadStrings('/assets/scene2.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  textSize(20);
  textFont(jetbrains);
  text("hello", 500, 500);
  fill(value);
  square(100, 100, 100);
  
  for (object of objects) {
    text(object, 400, 300);
  }

  
}

function keyPressed() {
  if (key === "c") {
    value = 100;
    objects.push("C");
  }
}

function keyReleased() {
  if (key === "c") {
    objects.pop();
  }
}