let numOne = '';
let numTwo = '';
let operator = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');


// 숫자 입력
const onClickNumber = (event) => {
    if (!operator) {
        numOne += event.target.textContent; 
        $result.value += event.target.textContent;
        return; // 함수 종료
    }

    if (!numTwo) {
        $result.value = '';
    }
    numTwo += event.target.textContent;
    $result.value += event.target.textContent;
};

// 연산자 입력
const onClickOperator = (op) => (event) => {
    if (operator) {
        numOne = calculate;
    }
    
    if (numOne) {
        operator = op;
        $operator.value = op;
    } else {
        alert('숫자를 먼저 입력하세요.');
    }
}

const calculate = () => {
    if (numTwo) {
        switch (operator) {
          case '+':
            $result.value = parseInt(numOne) + parseInt(numTwo);
            break;
          case '-':
            $result.value = numOne - numTwo;
            break;
          case '*':
            $result.value = numOne * numTwo;
            break;
          case '/':
            $result.value = numOne / numTwo;
            break;
          default:
            break;
        }
      } else {
        alert('숫자를 먼저 입력하세요.');
      }
}

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);
document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));

document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    numTwo = '';
    operator = '';
    $operator.value = '';
    $result.value = '';
});

document.querySelector('#calculate').addEventListener('click', calculate);