const range = document.getElementById("js-range");
const display = document.getElementById("js-result");
const guess = document.forms[0];
const obValueView = document.getElementById("maxValue");

// 슬라이더 실시간 값 변경
const showSliderValue = (sVal) => {
  obValueView.innerHTML = sVal;
};

const handlePrint = (e) => {
  e.preventDefault(); // 우선 다른 이벤트들 멈춤

  // 정수 난수 생성 함수
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // min이상 max 미만
  };

  // 5 ~ 슬라이더의 최대값 사이의 랜덤한 값 생성
  const random = getRandomInt(5, obValueView.innerHTML);

  const diplaySpan = display.querySelector("span");

  if (guess.elements[0].value < random)
    diplaySpan.innerHTML = `
	You choose: ${guess.elements[0].value} the machine choose: ${random}<br />
  <strong>you lost!</strong><br />`;
  else
    diplaySpan.innerHTML = `
	You choose: ${guess.elements[0].value} the machine choose: ${random}<br />
  <strong>you won!</strong><br />`;
};

document.getElementById("submit").addEventListener("click", handlePrint);
