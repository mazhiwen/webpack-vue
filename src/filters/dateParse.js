function toTwoDigit(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
}
function paramToDate(param) {
  if (param instanceof Date) {
    return param;
  } if (param) {
    return new Date(param);
  }
  return false;
}

export default {
  msToTime: (millisecond) => {
    const timeObj = paramToDate(millisecond);

    if (timeObj) {
      return `${toTwoDigit(timeObj.getHours())}:${toTwoDigit(timeObj.getMinutes())}:${toTwoDigit(timeObj.getSeconds())}`;
    }
    return '';
  },
  msToDateTime: (millisecond) => {
    const timeObj = paramToDate(millisecond);

    if (timeObj) {
      return `${timeObj.getFullYear()}-${toTwoDigit(timeObj.getMonth() + 1)}-${toTwoDigit(timeObj.getDate())} ${toTwoDigit(timeObj.getHours())}:${toTwoDigit(timeObj.getMinutes())}:${toTwoDigit(timeObj.getSeconds())}`;
    }
    return '';
  },
  msToDate: (millisecond) => {
    const timeObj = paramToDate(millisecond);
    if (timeObj) {
      return `${timeObj.getFullYear()}-${toTwoDigit(timeObj.getMonth() + 1)}-${toTwoDigit(timeObj.getDate())}`;
    }
    return '';
  },
};
