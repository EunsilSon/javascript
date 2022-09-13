/*
  셀프 체크
  1. 컴퓨터의 턴 만들기
  2. 생각하는 척하는 컴퓨터 만들기
*/

const { body } = document;

const $table = document.createElement('table'); 
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

/*
 승부 검사
*/
const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex;

  // 세 칸 다 채워졌나?
  let hasWinner = false;

  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }

  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }

  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }

  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
};

/*
승부 검사 및 칸 선택
*/
const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);

  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', callback);
    return;
  }
  
  // 승자가 없으면
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = '무승부';
    return;
  }

  turn = turn === 'X' ? 'O' : 'X';
};


let clickable = true;

const callback = (event) => {
  if (!clickable) {
    return;
  }

  if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
    console.log('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다');
  event.target.textContent = turn;
  checkWinnerAndDraw(event.target);

  if (turn === 'X') {
    clickable = false; // 사용자는 클릭 금지

    setTimeout(() => {
      // 배열.filter : 배열의 요소를 순차적으로 순회하며 조건에 일치하는 요소를 모아 새로운 배열 반환
      const emptyCells = rows.flat().filter((v) => !v.textContent); // 1차원 배열로 바꾼 후 textContent가 비어있는 요소만 선택해 새 배열 생성
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // emptyCells 인덱스에 랜덤값으로 접근
      randomCell.textContent = 'X';
      checkWinnerAndDraw(event.target);

      clickable = true;
    }, 1000);
  }
};


/*
 3x3 배열 만들기
 */
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];

  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener('click', callback); // 이벤트 버블링 현상 (부모 태그에게 이벤트가 감), 반대 개념 -> 이벤트 캡처링 (자식 태그에게 이벤트가 감)
body.append($table);
body.append($result);