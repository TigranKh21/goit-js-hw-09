function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const bodyEl = document.querySelector('body')
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function onChangeColor(){
    bodyEl.style.backgroundColor = getRandomHexColor()
}

let timerId = null;
startBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    timerId = setInterval(onChangeColor, 1000);
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');

})
stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    stopBtn.setAttribute('disabled', 'true');
    startBtn.removeAttribute('disabled');
})
