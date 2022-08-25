const array = [1, 2, 3, 4];


/* for-each */
array.forEach((element, i) => {
  console.log(element);
})


/* Map
- forEach과 같은 맥락
- 배열의 요소를 한 개씩 바꾼다 -> 기존 배열 수정X 새로운 배열 생성
*/
array.map((element, i) => {
  return element * 2;
})


// 빈 배열 생성
Array(9);

// 배열 요소 채우기
Array(9).fill(0);

// 빈 배열에 Map으로 배열 요소 채우기
Array(9).fill(0).map((element, index) => {
  return ++index;
})