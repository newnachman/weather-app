

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

  return `${day} (${date} ${month})`;
}