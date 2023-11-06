import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const createBtn = document.querySelector('button');

createBtn.addEventListener('click', onCreateBtn);

function onCreateBtn(event) {
  event.preventDefault();
  const delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);
  let counter = 1;

  console.log(new Date().getSeconds());

  setTimeout(() => {
    console.log(new Date().getSeconds());
    createPromise(counter, delay);
    counter++;
    console.log(
      `delay = ${delay}, step = ${step}, amount = ${amount}, counter = ${
        counter - 1
      }`
    );
  }, delay);

  const intervalId = setInterval(() => {
    console.log(new Date().getSeconds());
    createPromise(counter, step);
    counter++;
    console.log(
      `delay = ${delay}, step = ${step}, amount = ${amount}, counter = ${
        counter - 1
      }`
    );
    if (counter === amount + 1) {
      clearInterval(intervalId);
    }
  }, step);
}
