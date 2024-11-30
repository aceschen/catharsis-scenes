let sceneText = [];
let scene = [];
let scenePrinter = [];

let lineNumber = 0; 

let wordCount = 0;
let charPrint = 1;
let currentText = "";

let inBrackets = false;
let choices = ["", ""];
let lastChoiceIndex = 0;
let pauseForInput = false;

let pause = 0;
let wHeight;
let scrollOffset = 120;

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/scene4.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scenePrinter.push(sceneText[0]);
  scenePrinter.push(sceneText[1]);
  wordCount = scenePrinter[0].length;
  frameRate(48);
  wHeight = windowHeight

  currentText = sceneText[0];
}

let textToPrint = "";
let i = 0;

function draw() {
  background(255);
  textSize(20);
  textFont(jetbrains);

  let lineY = scrollOffset; 
  let lineX = 300;

  inBrackets = false;

  // let c = 0;
  
  for (i = 0; i < charPrint; i++) {
    if (currentText.charAt(i) == "+"){ // end of line
      lineY += 80;
      lineX = 300;
    } else {
      if (currentText.charAt(i) == "[") {
        inBrackets = true;
      } else if (currentText.charAt(i-1) == "]") {
        inBrackets = false;
      } else if (currentText.charAt(i) == "]") {
        pauseForInput = true;
      }
      if (inBrackets)
        fill("deeppink");
      else 
        fill("black");
      
      text(currentText.charAt(i), lineX, lineY);
      lineX += (12);
      
      // newline
      if (lineX > windowWidth - 300 && currentText.charAt(i) == " ") {
        lineY += 40;
        lineX = 300;
      }
    } 
  }

  print(pauseForInput);
  
  // add new char
    if (i < currentText.length) {
      if (!pauseForInput)
        charPrint += 1;
    }

  // add the cursor
  if (frameCount % 36 > 10) {
    text("|", lineX, lineY);
  }

  // pause and go to next para
  if (i == currentText.length) {
    if (pause > frameRate() && sceneText[lineNumber + 1] != undefined) { 
      lineNumber += 1;
      currentText += "+"
      currentText += sceneText[lineNumber];
      pause = 0;
    } else {
      pause += 1;
    }
  }

  // while (i < charPrint) {
  //   let c = line[i];
  //   if (c == "+"){ // end of line
  //     lineY += 80;
  //     lineX = 300;
  //   } else {
  //     if (c == "[") {
  //       inBrackets = true;
  //     } else if (line[i-1] == "]") {
  //       inBrackets = false;
  //       lastChoiceIndex = i;
  //       pauseForInput = true;
  //     }
  //     if (inBrackets)
  //       fill("deeppink");
  //     else 
  //       fill("black");     

  //     text(c, lineX, lineY);
  //     lineX += (12);
  //   } 

  //   // newline
  //   if (lineX > windowWidth - 300 && line[i+1] == " ") {
  //     i += 1;
  //     lineY += 40;
  //     lineX = 300;
  //   }

  //   // if (!pauseForInput) 
  //     i += 1;
  // }

  choices[0] = currentText.substring(currentText.indexOf("[") + 1, currentText.indexOf("/")); 
  choices[1] = currentText.substring(currentText.indexOf("/") + 1, currentText.indexOf("]")); 
  
  if ((lineY+240) > wHeight && charPrint < currentText.length) { 
    scrollOffset -= (windowHeight/2);
    lineY = scrollOffset;
    resizeCanvas(windowWidth - 20, wHeight - 20);
  }
}

function keyPressed() {
  if (pauseForInput && (key === "ArrowLeft" || key === "ArrowRight")) {
    let newText = currentText.substring(0, currentText.indexOf("["));
    if (key === "ArrowLeft")
      newText += choices[0];
    else if (key === "ArrowRight")
      newText += choices[1];
    newText += currentText.substring(currentText.indexOf("]") + 1);
    currentText = newText;
    charPrint -= choices[1].length + 3;
    pauseForInput = false;
  }
}