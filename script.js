const secondElement = document.querySelector('[data-timer="seconds"]');
const minuteElement = document.querySelector('[data-timer="minutes"]');
const hourElement = document.querySelector('[data-timer="hours"]');
const dayElement = document.querySelector('[data-timer="days"]');
const monthElement = document.querySelector('[data-timer="month"]');

const ledgeStopwatch = document.querySelector('[data-timer="ledge-stopwatch"]');
const ledgeCurrentTime = document.querySelector('[data-timer="ledge-current-time"]');

const buttonContainer = document.querySelector('.button-container')
const resetElement = document.querySelector('[data-timer="reset"]');
const startElement = document.querySelector('[data-timer="start"]')

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentTimeId;
let stopWatchId;

currentTimeId = setInterval(getCurrentTime, 1000)

ledgeStopwatch.addEventListener('click', handleStopwatch);
ledgeCurrentTime.addEventListener('click', handleCurrentTime);

resetElement.addEventListener('click', () => {
  resetTime(getDateElement());
  resetElement.classList.add('reset-active');
  resetElement.classList.add('reset-animation');
});
startElement.addEventListener('click', () => {
  getStopwatch();
  if (startElement.classList.contains('button-pause')) {
    resetElement.classList.add('reset-active');
  } else {
    resetElement.classList.remove('reset-active');
    resetElement.classList.remove('reset-animation');
  }
})

function getDateElement() {
  return {
    seconds: secondElement,
    minutes: minuteElement,
    hours: hourElement,
    days: dayElement,
  }
}

function getCurrentTime() {
  let date = new Date();
  let month = date.getMonth();

  let dateValues = {
    seconds: date.getSeconds(),
    minutes: date.getMinutes(),
    hours: date.getHours(),
    days: date.getDate(),
  };

  monthElement.textContent = monthList[month];
  displayTime(dateValues, getDateElement());
}

function displayTime(dateValue, dateElement) {
  for (let key in dateValue) {
    let dateValueArr = [dateValue[key]].join('').split('');
    let dateFirstElement = dateElement[key].firstElementChild;
    let dateLastElement = dateElement[key].lastElementChild;

    if (dateValue[key] > 9) {
      dateFirstElement.textContent = dateValueArr[0];
      dateLastElement.textContent = dateValueArr[1];
    } else {
      dateFirstElement.textContent = '0';
      dateLastElement.textContent = dateValue[key];
    }
  }
}

function handleStopwatch() {
  clearInterval(currentTimeId);
  toggleClassByAttribute("stopwatch");
  if (isResetDisplayedTime(getDateElement())) {
    resetElement.classList.add('reset-active');
  } else {
    resetElement.classList.remove('reset-active');
  }
}

function handleCurrentTime(event) {
  currentTimeId = setInterval(getCurrentTime, 1000);
  clearInterval(stopWatchId);
  startElement.classList.remove('button-pause');
  toggleClassByAttribute("current-time");
}

function resetTime(dateElement) {
  for (let elem of Object.values(dateElement)) {
    elem.firstElementChild.textContent = '0';
    elem.lastElementChild.textContent = '0';
  }
}

function getStopwatch() {
  let times = getTimesValues();
  getCurrentDisplayedTime(times, getDateElement());
  startElement.classList.toggle('button-pause');
  clearInterval(stopWatchId);
  if (startElement.classList.contains('button-pause')) {
    stopWatchId = setInterval(() => {
      times.seconds++;
      times.minutes = times.minutes + increaseCount(times, 'seconds');
      times.hours = times.hours + increaseCount(times, 'minutes');
      times.days = times.days + increaseCount(times, 'hours');
      displayTime(times, getDateElement());
    }, 1000);
  }
}

function getTimesValues() {
  return {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  }
}

function increaseCount(obj, count) {
  if (obj[count] > 59) {
    obj[count] = 0;
    return 1;
  }
  return 0;
}

function isResetDisplayedTime(obj) {
  let values = [];
  for (let elem of Object.values(obj)) {
    let firstElem = elem.firstElementChild;
    let lastElem = elem.lastElementChild;
    values.push(firstElem.textContent, lastElem.textContent);
  }
  return Math.max(...values) === 0;
}

function toggleClassByAttribute(str) {
  let stopwatchElements = document.querySelectorAll(`[data-ledge="stopwatch"]`);
  let currentMode = {
    "stopwatch": "add",
    "current-time": "remove",
  };
  if (currentMode[str]) {
    for (let elem of stopwatchElements) {
      elem.classList[currentMode[str]]('active-stopwatch');
    }
  } else {
    return undefined;
  }
}

function getCurrentDisplayedTime(currentTime, dateElement) {
  for (let key of Object.keys(currentTime)) {
    currentTime[key] = Number(dateElement[key].firstElementChild.innerHTML + dateElement[key].lastElementChild.innerHTML);
  }
}