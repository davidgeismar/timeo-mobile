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
