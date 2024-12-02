let sceneText = [];
let scene = [];
let scenePrinter = [];
let namePrinter = [];
let sceneProgress = 0; 
let started = false;
let nameTyped = false;
let enterShown = true;
let screenNumber = 0;

let forbiddenLetters = [];
let hiddenLetters = [];
let firstLine = '"';
let lastLine = '"';

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/name.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  // scenePrinter.push(sceneText[2]);
  // scenePrinter.push(sceneText[3]);
  frameRate(30);
}

function draw() {
  background(255);
  textSize(20);
  textFont(jetbrains);


  if (!started) {
    let lineX = 300; 
    let lineY = 120;
    
    text("SCENE 2: NAME", lineX, lineY);
    text("(Type your name, then press ENTER.)", lineX, lineY + 40);
    for (var letter of namePrinter) {
      fill("blue");
      text(letter, lineX, lineY + 80);
      lineX += 12
      fill("black");
    }
  } else {

    
    fill("black");
    if (screenNumber <= 8)
      text("(Type your name.)", 300, 120);
    
    lineX = 0; 
    lineY = 180;

    for (var para of scenePrinter) {
      para = split(para, " ");
      for (var word of para) {
        if (word == '\n') {
          lineX = 0; 
          lineY += 80;
        } else if (word == '!.') {
          for (var nameLetter of namePrinter) {
            letterColor(nameLetter);
            text(nameLetter, lineX + 300, lineY);
            lineX += 12
          }
          fill("black");
          text(".", lineX + 300, lineY);
          lineX += 27;
        } else {
          for (var letter of word) {
            letterColor(letter);
            text(letter, lineX + 300, lineY);
            fill("black");
            lineX += (12);
          }
          lineX += (12);
          if (lineX > windowWidth - 600) {
            lineY += 40;
            lineX = 0;
          } 
        }
      }
      lineX = 0; 
      lineY += 80;
    }
  }
}

function keyPressed() {

  if (!started) {
    if (keyIsDown(13) === true) { // enter
      started = true;
      for (var letter in namePrinter) {
        letter = namePrinter[letter];
        firstLine += letter;
        lastLine += letter;
        letter = letter.toLowerCase();
        if (forbiddenLetters.indexOf(letter) == -1 && letter != " ") {
          forbiddenLetters.push(letter);
        }
      }
     
      firstLine += '?"';
      lastLine += '."';
    }
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode === 32 || keyCode === 189)) { // alphabet space hyphen
      namePrinter.push(key);
    } else if (keyCode === 8) { // backspace
      namePrinter.pop();
    }
  } 

  if (started) {
    if (keyIsDown(13) === true && sceneProgress < 18 && enterShown) {
      screenNumber += 1;
      if (screenNumber > 8) {
        scenePrinter = [lastLine];
        // scenePrinter.push("\n");
        scenePrinter.push("(END OF SCENE 2.)");
        hiddenLetters = [];
      } else {
        scenePrinter = [firstLine];
        scenePrinter.push(sceneText[sceneProgress]);
        scenePrinter.push(sceneText[sceneProgress + 1]);
        sceneProgress += 2;
        for (var letter of forbiddenLetters) {
          hiddenLetters.push(letter);
        }
        enterShown = false;
      }
    }
    for (var letter of hiddenLetters) {
      if (key === letter) {
        hiddenLetters.splice(hiddenLetters.indexOf(key), 1);
        print(hiddenLetters);
      }
    }
    if (hiddenLetters.length == 0 && !enterShown) {
      scenePrinter.push("(Press ENTER to continue.)")
      enterShown = true;
    }
  }
}

function letterColor(letter) {
  for (var letterCheck of forbiddenLetters) {
    let letterLow = letter.toLowerCase();
    if (hiddenLetters.indexOf(letterLow) > -1) 
      fill (0, 0, 0, screenNumber * 10);
    else if (forbiddenLetters.indexOf(letterLow) > -1) 
      fill ("blue");
  }
}