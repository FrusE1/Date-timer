const secondElement = document.querySelector('[data-timer="seconds"]');
const minuteElement = document.querySelector('[data-timer="minutes"]');
const hourElement = document.querySelector('[data-timer="hours"]');
const dayElement = document.querySelector('[data-timer="days"]');
const monthElement = document.querySelector('[data-timer="month"]');

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function timer() {
  let date = new Date();

  let second = date.getSeconds();
  let minute = date.getMinutes();
  let hour = date.getHours();
  let day = date.getDate();
  let month = date.getMonth();

  let timeValueObject = {
    seconds: second,
    minutes: minute,
    hours: hour,
    days: day,
  };
  let timeElementObject = {
    seconds: secondElement,
    minutes: minuteElement,
    hours: hourElement,
    days: dayElement,
  };

  monthElement.textContent = monthList[month];
  displaysTimeData(timeValueObject, timeElementObject);
}

function displaysTimeData(timeValue, timeElement) {
  for (let key in timeValue) {
    let timeValueArr = [timeValue[key]].join('').split('');
    let timeFirstElement = timeElement[key].firstElementChild;
    let timeLastElement = timeElement[key].lastElementChild;

    if (timeValue[key] > 9) {
      timeFirstElement.textContent = timeValueArr[0];
      timeLastElement.textContent = timeValueArr[1];
    } else {
      timeFirstElement.textContent = '0';
      timeLastElement.textContent = timeValue[key];
    }
  }
}

setInterval(timer, 1000);