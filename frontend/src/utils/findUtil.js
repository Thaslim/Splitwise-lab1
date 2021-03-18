/* eslint-disable comma-dangle */
export const findInArray = (arrObj, email) => {
  const found = arrObj.find((element) => element.memberEmail === email);
  return found;
};

export const findbyID = (arrObj, id) => {
  const found = arrObj.filter((ele) => ele.groupID === Number(id));
  return found;
};

export const sortArray = (arrObj) => {
  const sortedArrObj = arrObj.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return sortedArrObj;
};

export const getMonthDate = (date) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return monthNames[date];
};
