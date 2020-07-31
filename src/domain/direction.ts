import { Row, Col } from "./types"

function direction(rowIncrement: -1 | 0 | 1, colIncrement: -1 | 0 | 1) {
  function getNext(i: Row, j: Col) : { row: Row, col: Col} | null {
    const nextI = i + rowIncrement
    const nextJ = j + colIncrement

    if (nextI < 0 || nextI > 7 || nextJ < 0 || nextJ > 7) {
      return null
    }

    return { row: nextI as Row, col: nextJ as Col }
  }

  return {
    getNext
  }
}

function up() {
  return direction(-1, 0)
}
function down() {
  return direction(1, 0)
}
function left() {
  return direction(0, -1)
}
function right() {
  return direction(0, 1)
}
function upLeft() {
  return direction(-1, -1)
}
function upRight() {
  return direction(-1, 1)
}
function downLeft() {
  return direction(1, -1)
}
function downRight() {
  return direction(1, 1)
}

export default function() {
  return [
    up(),
    down(),
    left(),
    right(),
    upLeft(),
    upRight(),
    downLeft(),
    downRight()
  ]
}
