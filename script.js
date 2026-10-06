const gridContainer = document.querySelector(".gridContainer")
var currCell = document.querySelector(".currentGridItem")
var currCellId = currCell.id
const resetBtn = document.getElementById("resetBtn")

console.log(currCellId)

function reset() {
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      cellId = `${row}${col}`;
      if (cellId === 44) {
      } else if (Math.random() > 0.8) {
        cell = document.getElementById(cellId);
        cell.classList.remove("gridItem");
        cell.classList.add("obstacle");
      } else {
        cell = document.getElementById(cellId);
        cell.removeAttribute("class")
        cell.classList.add("gridItem");
      }
    }
  }
  goalCell = document.getElementById('44');
  goalCell.removeAttribute('class');
  goalCell.classList.add('goalCell');
  goalCell.textContent = "goal";

  currCell = document.getElementById('00');
  currCell.removeAttribute('class');
  currCell.classList.add('currentGridItem');

  currCell = document.querySelector(".currentGridItem")
  currCellId = currCell.id  
}

function move(event) {
  const row = Number(currCellId[0]);
  const col = Number(currCellId[1]);

  let nextRow = row;
  let nextCol = col;
  switch (event.key) {
    case 'ArrowUp':
      nextRow--;
      console.log('up arrow pressed');
      break;
    case 'ArrowDown':
      nextRow++;
      console.log('down arrow pressed');
      break;
    case 'ArrowLeft':
      nextCol--;
      console.log('left arrow pressed');
      break;
    case 'ArrowRight':
      nextCol++;
      console.log("right arrow pressed");
      break;
  }
  const nextCellId = `${nextRow}${nextCol}`;
  updateUI(currCellId, nextCellId)
};

function updateUI(prevCellId, nextCellId) {
  console.log(prevCellId);
  console.log(nextCellId);
  if ((nextCellId[0] < 0) || (nextCellId[0] > 4)) {return};
  if ((nextCellId[1] < 0) || (nextCellId[1] > 4)) {return};
  prevCell = document.getElementById(prevCellId);
  nextCell = document.getElementById(nextCellId);

  if (nextCell.classList.contains("obstacle")) {return};
  if (nextCell.classList.contains("goalCell")) {
    prevCell.classList.remove("currentGridItem");
    prevCell.classList.add("gridItem");
    nextCell.textContent = "you win!";

    setTimeout(() => {
      reset(), 9000
    })
  }

  if (nextCell.classList.contains("gridItem")) {
    prevCell.classList.remove("currentGridItem");
    prevCell.classList.add("gridItem");
    nextCell.classList.remove("gridItem");
    nextCell.classList.add("currentGridItem");
  }

  currCell = nextCell;
  currCellId = nextCellId;
}

document.addEventListener('keydown', move);

resetBtn.addEventListener("click", reset);
