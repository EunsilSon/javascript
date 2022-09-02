const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
const records = [];

$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) { // 파랑
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요';

    timeouId = setTimeout(function () {
      startTime = new Date(); //시작 시간 재기

      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '클릭하세요!';
    }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 사이

  } else if (event.target.classList.contains('ready')) { // 빨강
    clearTimeout(timeoutId);
    $screen.classList.remove('ready');
    $screen.classList.add('waiting');
    $screen.textContent = '너무 성급하시군요!';

  } else if (event.target.classList.contains('now')) { // 초록
    endTime = new Date(); // 끝난 시간 재기

    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((acc, cur) => acc + cur) / records.length;
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;

    startTime = null;
    endTime = null;

    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요.';
  }
})

/*
  1. classList
    태그.classList 객체를 통해 태그에 붙은 클래스 조작 가능

  2. new Date(연, 월, 일, 시, 분, 초)
    - 현재 시각 구하기
    - 월은 0부터 시작

  3. const로 선언한 변수는 재할당 불가능하지만 배열에 요소를 추가하는 것은 가능
 
  4. reduce 함수
    [배열].reduce((누적값, 현재값) => {
      return 새로운 누적값;
    }, 초기값);
*/