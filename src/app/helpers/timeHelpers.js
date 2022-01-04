

export const getFormattedDate = (dateString) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let d = new Date(dateString);

  // day in week
  let day =   days[d.getDay()];
  // day in month
  let date =   d.getDate();
  // month
  let month =   months[d.getMonth()];

  return {day, date, month};
}

export const getArrayNumberByTimePassed = (arrayLength, interval) => {
  let maximumLength = arrayLength -1;
  let currentNumber = 0;
  let currentTime = (new Date().getTime()) / 1000;

  // Get data from storage:
  let lastTime = localStorage.getItem('time') ? Number(localStorage.getItem('time')) : null;
  let lastArrayNumber = localStorage.getItem('number') ? Number(localStorage.getItem('number')): null;

  if (lastTime && (lastArrayNumber || lastArrayNumber === 0)) {
    if (currentTime - lastTime >= interval) {
      // Time elapsed, change the array number.
      currentNumber = (lastArrayNumber === maximumLength) ? currentNumber : lastArrayNumber + 1;
    } else {
      // Time did not elapsed, no need to change the array number / time.
      return lastArrayNumber;
    }
  } 
  // First time calling this function, or time elapsed:
  localStorage.setItem('time', currentTime);
  localStorage.setItem('number', currentNumber); // current number is 0
  return currentNumber;
}