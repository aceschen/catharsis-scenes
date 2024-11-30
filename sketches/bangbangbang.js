let sceneText = [];
let scene = [];
let scenePrinter = ["(Press any keys.)"];
let sceneProgress = 0;
let wHeight;
let scrollOffset = 0;
let bangbangbang = false;
let byLetter = false;

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/bangbangbang.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}


function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  
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
      resizeCanvas(windowWidth - 20, wHeight - 20);
    }
  }
}

function keyPressed() {
  if (sceneProgress >= scene.length) {
    scenePrinter.push("");
  } else {
    let word = (scene[sceneProgress]);
    if (word == ".") {
      bangbangbang = false;
    }
    if (word == "Bang" || word == "bang" || bangbangbang) {
      bangbangbang = true;    
      let threshold = 4;
      let keysPressed = 0; 
      let i = 1
      while (i < 255) {
        if (keyIsDown(i) === true) 
          keysPressed += 1;
        i += 1
      }
      if (keysPressed >= threshold) {
        // scenePrinter.push(keysPressed.toString());
        printOne();
      }
    } else {
      printThree();
      // if (scene[sceneProgress] == "Bang" || scene[sceneProgress + 1] == "Bang" || scene[sceneProgress + 2] == "Bang")
      //   bangbangbang = true;
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
