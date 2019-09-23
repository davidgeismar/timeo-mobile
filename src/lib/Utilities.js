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

export const groupByYear = (events) => {
  // group by year
  var i = 0, val, groupedByYear = {};

  for ( ;i < events.length; i++){
    val = new Date(events[i]['created_at']).getFullYear()
    // si la date existe je push
    if (groupedByYear[val]){
      groupedByYear[val].push(events[i])
    }
    // sinon je cree la clé puis je push
    else {
      groupedByYear[val] = []
      groupedByYear[val].push(events[i])
    }
  }
  return groupedByYear
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const groupByMonth = (groupedByYear) => {
  // group by year
  var i = 0, val,
  groupedByMonth = {};
  var years = Object.keys(groupedByYear)
  for ( ;i < years.length; i++){
    var currentYear = years[i]
    groupedByMonth[currentYear] = {};
    for (j=0; j< groupedByYear[currentYear].length; j++){
      var date = new Date(groupedByYear[currentYear][j]['created_at'])
      val = monthNames[date.getMonth()];
      if (groupedByMonth[currentYear][val]){
        groupedByMonth[currentYear][val].push(groupedByYear[currentYear][j])
      }
      else {
        groupedByMonth[currentYear][val] = []
        groupedByMonth[currentYear][val].push(groupedByYear[currentYear][j])
      }
    }
  }
  return groupedByMonth
}

export const aggregateDurations = (groupedByMonth)=>{
  var i = 0;
  var years = Object.keys(groupedByMonth)
  for ( ;i < years.length; i++){
    var currentYear = years[i]
    var months = Object.keys(groupedByMonth[currentYear])
    var sumDuration = 0
    for(j=0; j< months.length; j++){
      var currentMonth = months[j]
      for(k=0; k<groupedByMonth[currentYear][currentMonth].length; k++){
        var duration = groupedByMonth[currentYear][currentMonth][k]['duration']
        if (groupedByMonth[currentYear][currentMonth][k]['duration']){
          sumDuration += duration
        }
      }
      groupedByMonth[currentYear][currentMonth]['duration'] = sumDuration;
      groupedByMonth[currentYear][currentMonth]['total'] = k
    }
  }
  return groupedByMonth
}
