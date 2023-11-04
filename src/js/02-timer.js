import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateInputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeParamsEl = document.querySelectorAll('.value')
const attr = timeParamsEl
//attrNew = attr.map(({span}) => {return span})

flatpickr(dateInputEl);
startBtn.addEventListener('click', onCountdown)

function onCountdown(event){
    const myTime = new Date (dateInputEl.value).getTime()
    console.log(myTime);
    const now = new Date().getTime()
    const intervalId = setInterval(()=>{
        countDownTime = myTime - now - 1000;
        //myTime = myTime - 1000;
    }, 1000)
    console.log(intervalId);
}

