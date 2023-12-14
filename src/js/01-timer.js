'use strict';
import iziToast from 'izitoast';
let userSelectedDate = 0;
let interval;
const buttonStart = document.querySelector(`button[data-start]`);
const displayTime = document.querySelectorAll(`.value`);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      buttonStart.classList.add(`is-active`);
    } else {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: `topCenter`,
        color: `red`,
        iconUrl: `../img/cancel_black_24dp.svg`,
      });
      buttonStart.classList.remove(`is-active`);
    }
  },
};

const element = document.querySelector(`#datetime-picker`);
import flatpickr from 'flatpickr';
flatpickr(element, options);

buttonStart.addEventListener(`click`, () => {
  let time = userSelectedDate - Date.now();
  if (buttonStart.classList.contains(`is-active`) && time > 1) {
    clearInterval(interval);
    interval = setInterval(() => {
      const timerTime = convertMs(time);

      [...displayTime].forEach((element, index) => {
        element.textContent = timerTime[index].toString().padStart(2, 0);
      });

      if (time < 1000) {
        iziToast.info({
          message: 'Time is up',
          position: `topCenter`,
        });
        clearInterval(interval);
      }
      time -= 1000;
    }, 1000);
    buttonStart.classList.remove(`is-active`);
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return [days, hours, minutes, seconds];
}
