/*
  셀프 체크 - 5판 3선승제로 만들기
*/

const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $count = document.querySelector('#count');
const $result = document.querySelector('#result');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = 'rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`; // 이미지 가로 세로 위치 선정
$computer.style.backgroundSize = 'auto 200px';

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
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`; // 이미지 가로 세로 위치 선정
  $computer.style.backgroundSize = 'auto 200px';
}

let intervalId = setInterval(changeComputerHand, 80);

let clickable = true;
let myScore = 0;
let computerScore = 0;
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
      } else if (computerChoice === 'scissors') {
        message = '사용자 승';
        myScore++;
      } else if (computerChoice === 'paper') {
        message = '컴퓨터 승';
        computerScore++;
      }

    } else if (myChoice === 'scissors') {
      if (computerChoice === 'rock') {
        message = '컴퓨터 승';
        computerScore++;
      } else if (computerChoice === 'scissors') {
        message = '무승부';
      } else if (computerChoice === 'paper') {
        message = '사용자 승';
        myScore++;
      }

    } else if (myChoice === 'paper') {
      if (computerChoice === 'rock') {
        message = '사용자 승';
        myScore++;
      } else if (computerChoice === 'scissors') {
        message = '컴퓨터 승';
        computerScore++;
      } else if (computerChoice === 'paper') {
        message = '무승부';
      }
    }
    $result.textContent = message;
    $score.textContent = `사용자 ${myScore}점  컴퓨터 ${computerScore}점`;

    if (myScore == 3) {
      $result.textContent = '사용자 최종 승리';
    } else if (computerScore == 3) {
      $result.textContent = '컴퓨터 최종 승리';
    } else {
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50);
      }, 1000);
      
    }
  }
};

$rock.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);