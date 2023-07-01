import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerForm = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

text.style.fontSize = '50px';
text.style.backgroundColor = 'yellow';
btnStart.style.fontSize = '50px';
btnStart.style.backgroundColor = 'yellow';

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Виберіть дату в майбутньому');
      btnStart.setAttribute('disabled', 'disabled');
    } else {
      Notiflix.Notify.success('Натисніть "Start"');
      btnStart.removeAttribute("disabled");
    }
  },
};

flatpickr(text, options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timerId = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    btnStart.setAttribute('disabled', 'disabled');
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerForm.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Відлік завершено');
      timerForm.style.color = 'black';
      clearInterval(timerId);
    }
  }, 1000);
});