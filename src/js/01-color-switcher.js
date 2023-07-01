const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function replaceBgColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
}

startBtnEl.addEventListener('click', startBtnClick);
stopBtnEl.addEventListener('click', stopBtnClick);

stopBtnEl.setAttribute("disabled", "disabled");

let intervalId = null;

function startBtnClick() {   
    intervalId = setInterval(() => {
        replaceBgColor();
    }, 1000);  

    startBtnEl.setAttribute("disabled", "disabled");
    stopBtnEl.removeAttribute("disabled");
}

function stopBtnClick() {
    clearInterval(intervalId);
    startBtnEl.removeAttribute("disabled");
    stopBtnEl.setAttribute("disabled", "disabled");
}

