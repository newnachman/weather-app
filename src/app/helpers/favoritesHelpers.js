
export const checkIfInArray = (item, array) => {
  if(array && array.length > 0){
    return array.includes(item);
  }
  return false;
}

