const findInArray = (arrObj, email) => {
  const found = arrObj.find((element) => element.memberEmail === email);
  return found;
};

export default findInArray;
