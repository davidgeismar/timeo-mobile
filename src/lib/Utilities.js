export const formatDuration = (hour, min) => {

  if (!hour) {
    hour = '00'
  }
  else if (hour < 10){
    hour = '0' + hour
  }

  if (!min) {
    min = '00'
  }

  if (0<min < 10 && Number.isInteger(min)){
    min = '0' + min
  }
  return hour+'h'+min+'min'
}


export const spitHours = (millis) => {
  var moment = require('moment');
  var duration = moment.duration(millis)

  return format(duration.hours())

}

export const spitMinutes = (millis) => {
  var moment = require('moment');
  var duration = moment.duration(millis)

  return format(duration.minutes())
}

export const spitSeconds = (millis) => {
  var moment = require('moment');
  var duration = moment.duration(millis)
  return format(duration.seconds())
}

function format(duration){
  if(!duration){
    return '00';
  } else if(('' + duration).length == 1){
    return '0' + duration;
  } else if(('' + duration).length == 3){
    return ('' + duration).slice(0, 2);
  } else {
    return duration;
  }
}