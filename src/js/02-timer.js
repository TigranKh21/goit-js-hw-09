import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeParamsEl = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    compareDates(selectedDates[0]);
  },
};

startBtn.setAttribute('disabled', 'true');

function compareDates(selectedDates) {
  const now = new Date();
  if (now < selectedDates) {
    startBtn.removeAttribute('disabled');
  } else {
    startBtn.setAttribute('disabled', 'true');
    Notify.failure('Please choose a date in the future');
  }
}

flatpickr(dateInputEl, options);

startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  const intervalId = setInterval(() => {
    const futureTime = new Date(dateInputEl.value).getTime();
    startBtn.setAttribute('disabled', 'true');
    const now = new Date().getTime();
    const leftTime = convertMs(futureTime - now);

    timeParamsEl[0].textContent =
      leftTime.days >= 10 ? leftTime.days : '0' + leftTime.days;
    timeParamsEl[1].textContent =
      leftTime.hours >= 10 ? leftTime.hours : '0' + leftTime.hours;
    timeParamsEl[2].textContent =
      leftTime.minutes >= 10 ? leftTime.minutes : '0' + leftTime.minutes;
    timeParamsEl[3].textContent =
      leftTime.seconds >= 10 ? leftTime.seconds : '0' + leftTime.seconds;

    if (futureTime - now <= 999) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
