const { body } = document; // 구조 분해 할당

const $table = document.createElement('table'); 
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

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
    rows[0][cellIndex].textContent   === turn &&
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

const callback = (event) => {
  if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
    console.log('빈칸이 아닙니다.');
    return;
  } else {
    console.log('빈칸입니다');
    event.target.textContent = turn;
  }

  // 승부 판단
  if (checkWinner(event.target)) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', callback);
    return;
  } 

  // 무승부 판단
  const draw = rows.flat().every((cell) => cell.textContent);

  /*
  rows.forEach((row) => {
    rows.forEach((cell) => {
      if (!cell.textContent) {
        draw = false;
      }
    });
  });
  */

  if (draw) {
    $result.textContent = '무승부';
    return;
  }

  turn = (turn === 'X') ? 'O' : 'X';
};

// 3x3 배열 만들기
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

/*
  1. 유사 배열

  2. 배열.every(조건 함수)
    - 1개라도 false일 경우 false
    - 1차원 배열에서만 사용 가능
  
  3. 배열.some(조건 함수)
    - 1개라도 true일 경우 true

  4. 배열.flat
    - 배열을 한 차원씩 나눠줌
*/