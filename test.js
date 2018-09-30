function groupByYear(events){
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
  // console.log(groupedByYear)
  return groupedByYear
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function groupByMonth(groupByYear){
  // group by year
  var i = 0, val,
  groupedByMonth = {};
  var years = Object.keys(groupedByYear)
  for ( ;i < years.length; i++){
    var currentYear = years[i]
    groupedByMonth[currentYear] = {};
    for (j=0; j< groupedByYear[currentYear].length; j++){
      console.log(groupedByYear[currentYear][j]['created_at'])
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

function aggregateDurations(groupedByMonth) {
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

var data = [{'created_at': '12/12/90', 'duration': 390000},{'created_at': '12/12/90', 'duration': 43000}, {'created_at': '10/11/1989', 'duration':  70000},  {'created_at': '10/11/1989', 'duration': 120000}]

var groupedByYear = groupByYear(data);
var groupedByMonth = groupByMonth(groupedByYear)
aggregateDurations(groupedByMonth)
