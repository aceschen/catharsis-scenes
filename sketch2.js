let sceneText = [];
let scene = [];
let scenePrinter = [];
let sceneProgress = 0; 
let started = false;
let released = false;
let wHeight;

let wait = 0;
let pressStart = 0;
let newKeyPressed = false;

let directionShown = false;
let letGo = false;

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/scene2.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  scenePrinter.push(sceneText[0]);
  scenePrinter.push(sceneText[1]);
  scenePrinter.push(sceneText[2]);
  
  // for (var para of sceneText) {
  //   scene = concat(scene, split(para, " "));
  //   scene.push('\n');
  // }
  wHeight = windowHeight;
  frameRate(30);
}

function draw() {
  background(255);
  textSize(20);
  textFont(jetbrains);

  let lineY = 120; 
  let lineX = 0;

  if (keyIsPressed) 
    keyChecker(frameCount);

  for (var para of scenePrinter) {
    para = split(para, " ");
    for (var word of para) {
      if ((word.toLowerCase().includes("dream")))
        fill('green'); 
      text(word, lineX + 300, lineY);
      fill('black');
      lineX += (word.length*12 + 12);
      if (lineX > windowWidth - 600) {
        lineY += 40;
        lineX = 0;
      }
    }
    lineX = 0; 
    lineY += 80; 
  }

  // text(frameCount, 100, 100);
  // text(pressStart, 100, 140);
}

function keyPressed() {
  pressStart = frameCount;
}

function keyChecker(pressMoment) {
  if (!letGo && !released){
    // left shift
    if (keyIsDown(16) === true) {
      started = true;
      pressPrint([sceneText[3], sceneText[4]]);
    } 
    if (started) {
      // enter
      if (keyIsDown(13) === true) {
        pressPrint([sceneText[5], sceneText[6]]);
      } 
      // g = 71
      if (keyIsDown(71) === true) {
        pressPrint([sceneText[7], sceneText[8], sceneText[9]]);
      } 
      // 0 = 48
      if (keyIsDown(48) === true) {
        pressPrint([sceneText[10], sceneText[11], sceneText[12]]);
      } 
      // b = 66
      if (keyIsDown(66) === true) {
        pressPrint([sceneText[13], sceneText[14], sceneText[15]]);
      } 
      // 1 = 49
      if (keyIsDown(49) === true) {
        pressPrint([sceneText[16], sceneText[17], sceneText[18]]);
      }   
    }
  }
}

function keyReleased() {
  if (letGo) {
    scenePrinter = ["I win."];
    scenePrinter.push("\n");
    scenePrinter.push("(END OF SCENE 2.)")
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






  // }
  // for (para of paras) 
  //   scenePrinter.push(para);
  // wait += 1; 
  // if (wait > 90)
  //   directionShown = true;
  // scenePrinter = [para1];
  //   if (wait > 90 || directionShown) {
  //     scenePrinter.push(para2);
  //     directionShown = true
  //     wait = 0;
  //   }


// function keyIsDown(LEFT_ARROYW) {
//   if (keyCode === 'SHIFT') {
//     scenePrinter = [];
//     scenePrinter.push(scene[4]);
//     scenePrinter.push(scene[5]);
//   }
// }

// function addWord() {
//   if (sceneProgress >= scene.length) {
//     scenePrinter.push("");
//   } else {
//     scenePrinter.push(scene[sceneProgress]);
//     // scenePrinter.push(scene[sceneProgress+1]);
//     // scenePrinter.push(scene[sceneProgress+2]);
//     sceneProgress += 1;
//   }
// }

// if (keyIsPressed == true) {


// let lineY = scrollOffset;
// let lineX = 0;

// if (!started) 
//   text("Press shift and don't let go.", 300, 140);

//   started = true;
//   if (started) 
//     addWord();
//   for (var word of scenePrinter) {
  //     if (word == '\n') {
    //       lineX = 0; 
    //       lineY += 80;
    //     } else {
  //       text(word, lineX + 300, lineY + 140);
  //       lineX += ((word.length * 12) + 15);
  //       if (lineX > windowWidth - 600) {
  //         lineY += 40;
  //         lineX = 0;
  //       }
  //     }
  //     if ((lineY+240) > wHeight && sceneProgress < scene.length) { 
  //       // wHeight += 140; 
  //       scrollOffset -= (windowHeight / 2 + 200);
  //       resizeCanvas(windowWidth, wHeight);
  //     }
  //   }
  // } 