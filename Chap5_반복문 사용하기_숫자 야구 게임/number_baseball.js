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

$form.addEventListener('submit', (event) => {
  event.preventDefault(); // 기본 동작 막기
  const value = $input.value;
  $input.value = '';
  
  /* 입력 값 유효성 검사 */
  if (!checkInput(value)) {
    return;
  }

  if (tries.length >= 10) {
    $logs.appendChild(document.createTextNode(`패배! 정답은 ${answer.join('')}`));
    return;
  }

  if (answer.join('') === value) { // join 배열의 값들을 문자열로 바꿈. 괄호 안에 구분자 설정 가능
    $logs.textContent = '홈런!';
    return;
  }

  /* 볼, 스트라이크 검사 */
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]); // 다를 때 -1
    if (index > -1) { // 일치하는 숫자 있음
      if (index === i) { // 자릿수O, 숫자O
        strike++;
      } else { // 자릿수X, 숫자O
        ball++;
      }
    }
  }
  $logs.append(`${value}: ${strike} 스트라이크, ${ball} 볼`, document.createElement('br'));
  tries.push(value);
});