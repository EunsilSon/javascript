const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = 'rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`; // 이미지 가로 세로 위치 선정
$computer.style.backgroundSize = 'auto 200px';

/*
  공통된 여러 개의 변수들을 객체로 묶어 그룹화한다. -> 변수 겹치는 문제 방지
*/
const rspX = {
  scissors : '0',
  paper : '-440px',
  rock : '-220px',
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
  if (computerChoice === 'scissors') {
    computerChoice = 'rock';
  } else if (computerChoice === 'rock') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'scissors';
  }
  /*
   rspX.computerChoice // 문자열
   rsp[compiterChoice] // 변수 값
  */
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`; // 이미지 가로 세로 위치 선정
  $computer.style.backgroundSize = 'auto 200px';
}
let intervalId = setInterval(changeComputerHand, 80);

let clickable = true;
let score = 0;
let message = '';

const clickButton = (event) => {

  if (clickable) {
    clearInterval(intervalId);
    clickable = false;

    const myChoice = event.target.textContent === '바위'
      ? 'rock'
      : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';

    if (myChoice === 'rock') {
      if (computerChoice === 'rock') {
        message = '무승부';
        console.log('무승부');
      } else if (computerChoice === 'scissors') {
        score++;
        message = '승리';
        console.log('승리');
      } else if (computerChoice === 'paper') {
        score--;
        message = '패배';
        console.log('패배');
      }
    } else if (myChoice === 'scissors') {
      if (computerChoice === 'rock') {
        score--;
        console.log('패배');
        console.log('패배');
      } else if (computerChoice === 'scissors') {
        message = '무승부';
        console.log('무승부');
      } else if (computerChoice === 'paper') {
        score++;
        message = '승리';
        console.log('승리');
      }
    } else if (myChoice === 'paper') {
      if (computerChoice === 'rock') {
        score++;
        message = '승리';
        console.log('승리');
      } else if (computerChoice === 'scissors') {
        score--;
        console.log('패배');
        console.log('패배');
      } else if (computerChoice === 'paper') {
        message = '무승부';
        console.log('무승부');
      }
    }
    $score.textContent = `${message}! ${score}점`;

    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};

$rock.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);