const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = ["javascript", "python", "css", "html", "react"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  word_el.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
         <div class="letter">
         ${correctLetters.includes(letter) ? letter : ""}         
         </div>
        `
      )
      .join("")}
    `;

  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    message_el.innerHTML = "Tebrikler kazandınız !";
  }
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `  
  ${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  items.forEach((items, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      items.style.display = "block";
    } else {
      items.style.display = "none";
    }
  });

  if (wrongLetters.length === items.length) {
    popup.style.display = "flex";
    message_el.innerHTML = "Maalesef kaybettiniz !";
  }
}

function displayMessage() {
  message.classList.add("show");

  setTimeout(function () {
    message.classList.remove("show");
  }, 2000);
}

playAgainBtn.addEventListener("click", function () {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getRandomWord();

  updateWrongLetters();
  displayWord();
  popup.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  //keyCode yerine artık code kullanılıyor!
  if (e.keyCode >= 65 && e.keyCode <= 222) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
        message.classList.add("show");
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }
});

displayWord();
