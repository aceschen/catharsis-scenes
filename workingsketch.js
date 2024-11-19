let sceneText = [];
let scene = [];
let scenePrinter = [];
let sceneProgress = 0; 

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/scene2.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scenePrinter.push(sceneText[0]);
  frameRate(30);
}

function draw() {
  background(255);
  textSize(20);
  textFont(jetbrains);

  let lineY = 120; 
  let lineX = 0;

  for (var para of scenePrinter) {
    para = split(para, " ");
    for (var word of para) {
        text(word, lineX + 300, lineY);
        lineX += (word.length*12 + 15);
        if (lineX > windowWidth - 600) {
          lineY += 40;
          lineX = 0;
        }
    }
    lineX = 0; 
    lineY += 80; 
  }
}

function keyPressed() {
  // left SDF
  if (keyIsDown(83) === true && keyIsDown(68) === true && keyIsDown(70) === true) {
    scenePrinter.push("A");
  }
}

function keyChecker() {
  if (!letGo){
    // left shift
    if (keyIsDown(16) === true && !released) {
      started = true;
      pressPrint([sceneText[3], sceneText[4]]);
    } 
  }
}

function keyReleased() {
  if (letGo) {
    scenePrinter = ["I win."];
  } else if (started) {
    scenePrinter = ["The moment has passed."];
    released = true;
  }
}

function pressPrint(paras) {
  scenePrinter = [];
  scenePrinter.push(paras[0]);

  // modify to extend based on paragraph length?
  let p0words = split(paras[0], " ").length;
  let p1words = split(paras[1], " ").length;

  if (frameCount > pressStart + 80)
    scenePrinter.push(paras[1]);
  if (paras.length == 3 && frameCount > pressStart + 160) {
    scenePrinter.push(paras[2])
    if (paras[2] == "(Let go.)")
      letGo = true;
  }
}
