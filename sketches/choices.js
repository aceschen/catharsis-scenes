let sceneText = [];

let lineNumber = 0; 

let charPrint = 1;
let currentText = "";

let inBrackets = false;
let choices = ["", ""];

let pause = 0;
let pauseForInput = false;

let wHeight;
let scrollOffset = 120;

let circleSize = 60; 
let startTap = false;
let ended = false;

let quiz = false;
let answers = [];
let correctAnswers = ["ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowRight"]
let failure = "";
let score = 0;

let jetbrains;

function preload() {
  sceneText = loadStrings('/assets/choices.txt');
  jetbrains = loadFont('/assets/JetBrainsMono-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  frameRate(60);
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

  for (i = 0; i < charPrint; i++) {
    let currentChar = currentText.charAt(i);
    if (currentChar == "+"){ // end of line
      lineY += 80;
      lineX = 300;
    } else if (currentChar == "*") {
      pauseForInput = true;
    } else if (currentChar == "&" && quiz == false) {
      quiz = true;
      currentText = currentText.substring(0, i) + currentText.substring(i + 1);
    } else if (currentChar == "^" && quiz == true) {
      quiz = false;
      currentText = currentText.substring(0, i) + currentText.substring(i + 1);
    } else if (currentChar == "%") {
      scoreCheck();
    } else if (currentChar == "$") {
      failCheck();
      currentText = currentText.substring(0, i) + failure + currentText.substring(i + 1);
    } else {
      if (currentChar == "[") {
        inBrackets = true;
      } else if (currentText.charAt(i-1) == "]") {
        inBrackets = false;
      } else if (currentChar == "]") {
        pauseForInput = true;
      }
      if (inBrackets)
        fill("deeppink");
      else 
        fill("black");
      
      text(currentChar, lineX, lineY);
      lineX += (12);
      
      // newline
      if (lineX > windowWidth - 300 && currentChar == " ") {
        lineY += 40;
        lineX = 300;
      }
    } 
  }
  
  // add new char
    if (i < currentText.length && !ended) {
      if (!pauseForInput)
        charPrint += 1;
    }

  // add the cursor
  if (frameCount % 36 > 10 && !ended) {
    text("|", lineX, lineY);
  }

  // pause and go to next para
  if (i == currentText.length) {
    if (pause > frameRate() && sceneText[lineNumber + 1] != undefined) { 
      lineNumber += 1;
      if (lineNumber == 4 || lineNumber == 12 || lineNumber == 19 || lineNumber == 25) {
        currentText = "+";
        currentText = sceneText[lineNumber];
        i = 0;
        charPrint = 1;
        scrollOffset = 120;
      } else {
        currentText += "+"
        currentText += sceneText[lineNumber];
      }
      pause = 0;
    } else {
      pause += 30;
    }
  }

  choices[0] = currentText.substring(currentText.indexOf("[") + 1, currentText.indexOf("/")); 
  choices[1] = currentText.substring(currentText.indexOf("/") + 1, currentText.indexOf("]")); 
  
  if ((lineY+240) > wHeight && charPrint < currentText.length) { 
    scrollOffset -= (windowHeight/2);
    lineY = scrollOffset;
    resizeCanvas(windowWidth - 20, wHeight - 20);
  }

  if (startTap) {
    noStroke();
    fill("deeppink");
    if (circleSize == 0) {
      scrollOffset = 120;
      currentText = "TEACHER: Are you listening?+(END OF SCENE 4)";
      charPrint = currentText.length;
      ended = true;
    } else {
      circleSize -= 1;
    }
    circle(100, 120, circleSize);
  }
  
}

function keyPressed() {
  if (!startTap && key === " " && pauseForInput) {
    pauseForInput = false;
    let newText = currentText.substring(0, currentText.indexOf("*"));
    newText += currentText.substring(currentText.indexOf("*") + 1);
    currentText = newText;
    startTap = true;
  }
  if (key === " ") {
    circleSize = 60;
  }
  if (pauseForInput && (key === "ArrowLeft" || key === "ArrowRight")) {
    let newText = currentText.substring(0, currentText.indexOf("["));
    if (key === "ArrowLeft") {
      newText += choices[0];
      charPrint -= choices[1].length + 3;
      i -= choices[1].length + 3;
    } else if (key === "ArrowRight") {
      newText += choices[1];
      charPrint -= choices[0].length + 3;
      i -= choices[0].length + 3;
    }
    newText += currentText.substring(currentText.indexOf("]") + 1);
    currentText = newText;
    if (quiz) {
      answers.push(key);
    }
    pauseForInput = false;
  }
}

function failCheck() {
  failure = answers.pop();
  if (failure == "ArrowRight") 
    failure = "highest";
  else if (failure == "ArrowLeft")
    failure = "lowest";
}

function scoreCheck() {
  for (let a = 0; a < 7; a++) {
    if (answers[a] == correctAnswers[a]) 
      score += 1;
  }
  let line = score.toFixed() + " out of 7. ";
  
  if (score == 0 && failure == "lowest") {
    line += "You failed both the quiz and the unit.)"
  } else if (score == 0 && failure == "highest") {
    line += "You've failed the quiz, but your grade is hanging on.)"
  } else if (score == 7 && failure == "highest") {
    line += "You aced the quiz, but you've failed the unit.)";
  } else if (score == 7 && failure == "lowest") {
    line += "You aced the quiz.)";
  } else  {
    line += "You're in the clear.)"
  }
  
  let newText = currentText.substring(0, currentText.indexOf("%"));
  newText += line;
  newText += currentText.substring(currentText.indexOf("%") + 1);
  currentText = newText;
}