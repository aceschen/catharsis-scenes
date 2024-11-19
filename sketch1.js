let sceneText = [];
let scene = [];
let scenePrinter = ["(Start typing.)"];
let sceneProgress = 0;
let wHeight;
let scrollOffset = 0;
let bangbangbang = false;
let byLetter = false;

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/scene1.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (var para of sceneText) {
    scene = concat(scene, split(para, " "));
    scene.push('\n');
  }
 
  wHeight = windowHeight;
  
}

function draw() {
  background(255);
  let lineY = scrollOffset;
  // let lineY = 0;
  let lineX = 0;
  for (var word of scenePrinter) {
    textSize(20);
    textFont(jetbrains);
    if (word == '\n') {
      lineX = 0; 
      lineY += 80;
    } else {
      if ((word.toLowerCase().includes("bang")))
        fill('red'); 
      if (byLetter) {
        
      }
      text(word, lineX + 300, lineY + 120);
      fill('black');
      lineX += ((word.length * 12) + 12);
      if (lineX > windowWidth - 600) {
        lineY += 40;
        lineX = 0;
      }
    }
    if ((lineY+240) > wHeight && sceneProgress < scene.length) { 
      scrollOffset -= (windowHeight/2);
      lineY = scrollOffset;
      resizeCanvas(windowWidth, wHeight);
    }
  }
}

function keyPressed() {
  if (sceneProgress >= scene.length) {
    scenePrinter.push("");
  } else {
    let word = (scene[sceneProgress]);
    if (word == "Pause." || bangbangbang) {
      bangbangbang = true;
      printOne();
    } else if (word.toLowerCase().includes("bang")) {
      printOne();
    } else {
      scenePrinter.push(scene[sceneProgress]);
      scenePrinter.push(scene[sceneProgress + 1]);
      scenePrinter.push(scene[sceneProgress + 2]);
      sceneProgress += 3;
      if (scene[sceneProgress] == "Pause." || scene[sceneProgress + 1] == "Pause." || scene[sceneProgress + 2] == "Pause.")
        bangbangbang = true;
    }
  }
}

function printOne() {
  scenePrinter.push(scene[sceneProgress]);
  sceneProgress += 1;
}

function printThree() {
  scenePrinter.push(scene[sceneProgress]);
  scenePrinter.push(scene[sceneProgress + 1]);
  scenePrinter.push(scene[sceneProgress + 2]);
  sceneProgress += 3;
}
