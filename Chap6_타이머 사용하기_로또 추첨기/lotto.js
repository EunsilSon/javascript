const candidate = Array(45).fill().map((value, index) => index++);

/* 피셔-에이츠 셔플 */
const shuffle = [];
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1); // 인덱스 위치의 요소 꺼내기 -> 배열에 들어가서 리턴됨
  const value = spliceArray[0]; // 배열에 있는 값을 꺼내서
  shuffle.push(value); // shuffle 배열에 추가
}
console.log(shuffle);

const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBalls, bonus);

/*
  splice() 원하는 위치에 요소 추가 및 삭제 (원본 배열 수정O)
  slice(start, index) 배열 자르기 (원본 배열 수정X)
*/

const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');

function colorize(number, $tag) {
  if (number < 10) {
    $tag.style.backgroundColor = 'red';
    $tag.style.color = 'white';
  } else if (number < 20) {
    $tag.style.backgroundColor = 'orange';
  } else if (number < 30) {
    $tag.style.backgroundColor = 'yellow';
  } else if (number < 40) {
    $tag.style.backgroundColor = 'blue';
    $tag.style.color = 'white';
  } else {
    $tag.style.backgroundColor = 'green';
    $tag.style.color = 'white';
  }
}

const drawBall = (number, $parent) => {
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = number;

  // 셀프 체크 - 숫자 별로 공 색칠하기
  colorize(number, $ball);

  $parent.appendChild($ball);
}

for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    drawBall(winBalls[i], $result);
  }, (i + 1) * 1000); // [0, 1, 2, 3, 4, 5] -> [1000, 2000, 3000, 4000, 5000]
}

setTimeout(() => {
  drawBall(bonus, $bonus);
}, 7000);

/*
  var -> 함수 스코프
   - 함수 내에서만

   * 비동기 함수와 함수 스코프를 가지는 variable이 만나면 클로저 문제가 발생한다.

  let -> 블록 스코프
   - 블록(중괄호) 내에서만 
*/