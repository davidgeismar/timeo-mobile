function groupByYear(events){
  // group by year
  var i = 0, val, groupedByYear = {};

  for ( ;i < events.length; i++){
    val = new Date(events[i]['created_at']).getFullYear()
    console.log(events[i]['created_at'])
    console.log(val)
    // si la date existe je push
    if (groupedByYear[val]){
      console.log(i)
      console.log(groupedByYear)
      groupedByYear[val].push(events[i])
    }
    // sinon je cree la clé puis je push
    else {
      groupedByYear[val] = []
      groupedByYear[val].push(events[i])
    }
  }

  console.log('before result')
  // console.log(groupedByYear)
  return groupedByYear
}


function groupByMonth(groupByYear){
  // group by year
  var i = 0, val,
  groupedByMonth = {};
  var years = Object.keys(groupedByYear)
  for ( ;i < years.length; i++){
    var currentYear = years[i]
    var groupedByMonth[currentYear] = {}
    for (j=0, j< groupedByYear[currentYear].length; j++){
      val = new Date(groupedByYear[currentYear][j]['created_at'].getFullMonth())
      if (groupedByMonth[currentYear][val]){
        groupedByMonth[currentYear][val].push(groupedByYear[currentYear][j])
      }
      else {
        groupedByMonth[currentYear][val] = []
        groupedByMonth[currentYear][val].push(groupedByYear[currentYear][j])
      }
    }
  }
  console.log('before result')
  // console.log(groupedByYear)
  return groupedByMonth
}



var data = [{'created_at': '12/12/90'}, {'created_at': '10/11/1989'}]
createEventsBucket(data)
