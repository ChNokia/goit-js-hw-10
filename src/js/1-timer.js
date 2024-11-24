'use strict'

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const MS_IN_SEC = 1000;

const startBtn = document.querySelector(".start-btn");
const inputDate = document.querySelector('input[type="text"]');
const dataDays = document.querySelector('.value[data-days]');
const dataHours = document.querySelector('.value[data-hours]');
const dataMinutes = document.querySelector('.value[data-minutes]');
const dataseconds = document.querySelector('.value[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      handleCloseCalendar(selectedDates[0]);
  },
};
iziToast.settings({
    backgroundColor: 'red',
    position: 'topRight',
    timeout: 0,
    rtl: true,
    messageColor: 'white',
    displayMode: 1,
    message: 'Please choose a date in the future'
});
       
const fp = flatpickr(inputDate, options);
let currentDate = Date.now();
let userSelectedDate = fp.now.getTime();
let intervalId;

startBtn.addEventListener("click", handleStartBtnClick);

function handleCloseCalendar(selectedDates) {
    currentDate = Date.now();
    userSelectedDate = selectedDates.getTime() - currentDate;
    setStartBtnDisabled(userSelectedDate <= 0);

    if (startBtn.disabled) {
       iziToast.show();
    } else {
        iziToast.destroy();
    }
}

function handleStartBtnClick() {
    setStartBtnDisabled(true);
    inputDate.disabled = true;

    updateDate(convertMs(userSelectedDate));
    intervalId = setInterval(updateTimer, MS_IN_SEC);
}

function setStartBtnDisabled(value) {
    startBtn.disabled = value;
}

function updateTimer() {
    userSelectedDate -= MS_IN_SEC;
    updateDate(convertMs(userSelectedDate));

    if (userSelectedDate < MS_IN_SEC) {
        inputDate.disabled = false;
        currentDate = Date.now();
        clearInterval(intervalId);
    }
}

function updateDate({ days, hours, minutes, seconds }) {
    dataDays.innerHTML = addLeadingZero(days);
    dataHours.innerHTML = addLeadingZero(hours);
    dataMinutes.innerHTML = addLeadingZero(minutes);
    dataseconds.innerHTML = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
