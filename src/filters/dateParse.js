function toTwoDigit(n){
  
  if(n<10){
    return '0'+n;
  }else{
    return n;
  }

}
function paramToDate(param){
  if( param instanceof Date){
    return param
  }else if(param){
    
    return new Date(param);
  }else{
    return false;
  }
}

export default {
  msToTime:(millisecond) => {
    var timeObj =paramToDate(millisecond);
    
    if(timeObj){
      return toTwoDigit(timeObj.getHours())+':'+toTwoDigit(timeObj.getMinutes())+':'+toTwoDigit(timeObj.getSeconds());
    }else{
      return '';
    }
  },
  msToDateTime:(millisecond) => {

    var timeObj =paramToDate(millisecond);
    
    if(timeObj){
      return timeObj.getFullYear()+'-'+toTwoDigit(timeObj.getMonth()+1)+'-'+toTwoDigit(timeObj.getDate())+' '+toTwoDigit(timeObj.getHours())+':'+toTwoDigit(timeObj.getMinutes())+':'+toTwoDigit(timeObj.getSeconds());

    }else{
      return '';
    }
  },
  msToDate:(millisecond) => {
    var timeObj =paramToDate(millisecond);
    if(timeObj){
      return timeObj.getFullYear()+'-'+toTwoDigit(timeObj.getMonth()+1)+'-'+toTwoDigit(timeObj.getDate());
    }else{
      return '';
    }
  }
}



