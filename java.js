// Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const questionText = document.getElementById("question-text");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

// Options values for buttons
let options = {
  "Isu Falsafah Pendidikan": [
    { word: "Pedagogi", question: "Ia merupakan kajian mengenai pengajaran, khususnya pengajaran dalam pendidikan formal." },
    { word: "Kemahiran", question: "... Abad 21 menekankan kepentingan kemampuan berfikir pada aras lebih tinggi." },
    { word: "Industri", question: "Revolusi ... 4.0 amat mementingkan pengetahuan media serta maklumat, komunikasi dan teknologi." },
    { word: "Fpk", question: "Dasar pendidikan untuk melahirkan insan seimbang dari segi Jasmani, Emosi, Rohani, Intelektual dan Sosial. " },
    { word: "Jasmani", question: "Empat aspek utama yang menyentuh asas iaitu intelek, rohani, emosi dan ..." },
    { word: "Kepercayaan", question: "Asas utama kepada IREJ untuk melahirkan insan seimbang dan harmonis adalah berpaksikan ... dan kepatuhan kepada Tuhan." },
  ],
  "Isu Dasar & Sistem Pendidikan": [
    { word: "Etnik", question: "Penggunaan bahasa ... perlu diterapkan dalam aliran sekali gus dapat memartabatkan dalam sistem pendidikan kebangsaan." },
    { word: "Identiti", question: "... nasional dapat diwujudkan jika menggunakan satu aliran sekolah." },
    { word: "Perennialisme", question: "Falsafah pendidikan tradisional essensialisme dan ... menyatakan pendidikan adalah persediaan untuk kehidupan." },
    { word: "Akhlak", question: "Pembentukan ... dan pendidikan moral penting supaya dapat pendidikan supaya dapat menjalani penghidupan dalam masyarakat yang berbilang kaum." },
    { word: "Melayu", question: "Bahasa ... perlu digunakan sepenuhnya dalam semua kegiatan budaya tinggi." },
    { word: "Teknologi", question: "Sains, ... , kejuruteraan, matematik dan arts merupakan komponen penting dalam kurikulum pendidikan." },
  ],
  "Isu Pendidikan dan Cabaran": [
    { word: "Peraturan", question: "Pembelajaran terlalu terikat dengan jadual waktu, bilik darjah, kawasan sekolah dan ... ." },
    { word: "Kefahaman", question: "murid-murid gagal untuk mempersepadukan ... tentang isu-isu dan penyelesaiannya." },
    { word: "Kesejahteraan", question: "... dan kemakmuran merupakan cabaran yang perlu dihadapi dalam isu pendidikan." },
    { word: "Bahasa", question: "Penggunaan ... penghantar yang berbeza telah mengurangkan penguasaan terhadap bahasa Malaysia." },
    { word: "Vernakular", question: "Sekolah ... membentuk pemikiran yang boleh menjarakkan integrasi kaum." },
    { word: "kritis", question: "Apabila belajar untuk lebih mengetahui ianya menjadikan ruang murid berkreatif dan ... terhad." },
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";
let chosenQuestion = "";

// Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

// Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  // Disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

// Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  // If optionValue matches the button innerText, then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // Initially hide letters, clear previous word and question
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  questionText.innerText = "";

  let optionArray = options[optionValue];
  // Choose random word and question
  let randomIndex = Math.floor(Math.random() * optionArray.length);
  chosenWord = optionArray[randomIndex].word.toUpperCase();
  chosenQuestion = optionArray[randomIndex].question;

  // Replace every letter with a span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  // Display each element as span
  userInputSection.innerHTML = displayItem;
  questionText.innerText = chosenQuestion;
};

// Initial Function (Called when the page loads or user presses new game)
const initializer = () => {
	winCount = 0;
    count = 0;
  
  // Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  questionText.innerText = "";
  
  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
			  winSound.play();
			  
			  
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
		  loseSound.play();
		  
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};


// New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;