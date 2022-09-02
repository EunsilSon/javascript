/*
  셀프 체크 - 속도 순으로 정렬하기
  가장 빠른 속도 5개 출력하기
*/

const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
const records = [];
const topFive = [];

$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) { // 파랑
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요';

    timeoutId = setTimeout(function () {
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

    // 평균
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((acc, cur) => acc + cur) / records.length;
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;

    // 상위 5순위
    const topFive = records.sort((a, b) => a - b).slice(0, 5);

    topFive.forEach((element, i) => {
      $result.append(
        document.createElement('br'),
        `${i + 1}위: ${element}ms`,
      );
    });

    startTime = null;
    endTime = null;

    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요.';
  }
})