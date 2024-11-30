let sceneText = [];
let scene = [];
let scenePrinter = [];
let keyPrinter = [];
let sceneProgress = 0; 
let started = false;
let released = false;
let hold = false;
let wHeight;

let wait = 0;
let pressStart = 0;
let releaseStart = 0;
let newKeyPressed = false;

let directionShown = false;
let letGo = false;

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/dream.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}


function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
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

  if (!released) 
    keyChecker(frameCount);

  for (var para of scenePrinter) {
    para = split(para, " ");
    for (var word of para) {
      if ((word.toLowerCase().includes("dream")))
        fill('green'); 
      if (hold) {
        fill(0, 0, 0, 255 - (frameCount - releaseStart)*3);
      }
      if (released) {
        fill('black');
      }
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


  let keyLine = 120;
  for (var key of keyPrinter) {
    fill('green'); 
    text(key, 100, keyLine);
    keyLine += 40;
  }
  
  fill('black');
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
      // pressPrint([sceneText[3], sceneText[4]]);
      // if (!keyPrinter.includes("LEFT SHIFT")) 
      //   keyPrinter.push("LEFT SHIFT");
    } 
    if (started) {
      if (hold) {
        holdMoment();
      }
      // left shift again
      if (keyIsDown(16) === true) {
        hold = false;
        pressPrint([sceneText[3], sceneText[4]]);
        if (!keyPrinter.includes("Hold:")) {
          keyPrinter.push("Hold:");
          keyPrinter.push("LEFT SHIFT");
        }
      } 
      // enter
      if (keyIsDown(13) === true) {
        hold = false;
        pressPrint([sceneText[5], sceneText[6]]);
        if (!keyPrinter.includes("ENTER")) 
          keyPrinter.push("ENTER");
      } 
      // g = 71
      if (keyIsDown(71) === true) {
        hold = false;
        pressPrint([sceneText[7], sceneText[8], sceneText[9]]);
        if (!keyPrinter.includes("G")) 
          keyPrinter.push("G");
      } 
      // 0 = 48
      if (keyIsDown(48) === true) {
        hold = false;
        pressPrint([sceneText[10], sceneText[11], sceneText[12]]);
        if (!keyPrinter.includes("0")) 
          keyPrinter.push("0");
      } 
      // b = 66
      if (keyIsDown(66) === true) {
        hold = false;
        pressPrint([sceneText[13], sceneText[14], sceneText[15]]);
        if (!keyPrinter.includes("B")) 
          keyPrinter.push("B");
      } 
      // 1 = 49
      if (keyIsDown(49) === true) {
        hold = false;
        pressPrint([sceneText[16], sceneText[17], sceneText[18]]);
        if (!keyPrinter.includes("1")) 
          keyPrinter.push("1");
      }   
    }
  }
}

function keyReleased() {
  releaseStart = frameCount;
  if (letGo) {
    keyPrinter = [];
    scenePrinter = ["I win."];
    scenePrinter.push("\n");
    scenePrinter.push("(END OF SCENE 2.)")
  } else if (started) {
    // scenePrinter = ["The moment has passed."];
    // released = true;
    holdMoment();
    hold = true;
  }
}

function holdMoment() {
  if (!released) {
    if (frameCount > releaseStart + 85) {
      scenePrinter = ["The moment has passed."];
      released = true;
    } else {
      // fill(0, 0, 0, 40);
      // when frame change is 0 it should be 255 
      // when frame change is 150 it should be 0
      scenePrinter = ["The moment is fading. Hold the keys to return."];
    }
  }
    // released = true;
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