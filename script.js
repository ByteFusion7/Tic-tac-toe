const boxes = document.querySelectorAll(".box");

const newBtn = document.querySelector("#new-btn");

const resetBtn = document.querySelector("#reset");

const msgContainer = document.querySelector(".msg-container");

const msg = document.querySelector("#msg");

let turn = true;

let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const resetGame = () => {
  turn = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "O";
      turn = false;
    } else {
      box.innerText = "X";
      turn = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      drawCase();
    }
  });
});

const drawCase = () => {
  msg.innerText = "It's a DRAW 😑. ";
  msgContainer.classList.remove("hide");
  disableBoxes();

}
const checkWinner = () => {
  for (pattern of winPatterns) {

    const pos1Value = boxes[pattern[0]].innerText;
    const pos2Value = boxes[pattern[1]].innerText;
    const pos3Value = boxes[pattern[2]].innerText;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        showWinner(pos1Value);
        return true;
      }
    }
  }
}

const showWinner = (winner) => {
  msg.innerHTML = `Congratulations ${winner}. You won the game 🎉`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

