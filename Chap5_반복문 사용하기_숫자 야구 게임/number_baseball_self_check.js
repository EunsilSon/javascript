/*
아웃 구현하기
1. 0 스트라이크, 0 볼 인 경우 '아웃' 출력
2. 아웃 3번이면 패배
*/

const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

const numbers = [];
for (let n = 1; n <= 9; n++) {
  numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * numbers.length); // 0~8 정수
  answer.push(numbers[index]-1);
  numbers.splice(index, 1);
}

console.log(answer);

const tries = [];
function checkInput(input) { 
  // 길이가 4인가?
  if (input.length !== 4) { 
    return alert('4자리 숫자를 입력해 주세요.');
  }

  // 중복된 숫자가 있는가?
  if (new Set(input).size !== 4) { // new Set() 중복이 없는 배열
    return alert('중복되지 않게 입력해 주세요.');
  }

  // 이미 시도한 값인가?
  if (tries.includes(input)) {
    return alert('이미 시도한 값입니다.');
  }
  return true;
}

function defeated() {
  $logs.appendChild(document.createTextNode(`패배! 정답은 ${answer.join('')}`));
}

let out = 0;

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = $input.value;
  $input.value = '';

  if (!checkInput(value)) {
    return;
  }

  if (tries.length >= 9) {
    defeated();
    return;
  }

  if (answer.join('') === value) {
    $logs.textContent = '홈런!';
    return;
  }

  let strike = 0;
  let ball = 0;

  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);

    if (index > -1) { // 일치하는 숫자 있음
      index === i ? strike++ : ball++;
      }

    }

  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}:아웃`, document.createElement('br'));
  } else {
    $logs.append(`${value}: ${strike} 스트라이크, ${ball} 볼`, document.createElement('br'));
  }

  if (out === 3) {
    defeated();
    return;
  }

  tries.push(value);
});