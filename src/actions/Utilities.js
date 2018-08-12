export const getCurrentTime = () => {
  var d = new Date(); // for now
   var hour = d.getHours(); // => 9
   var min = d.getMinutes(); // =>  30
   if(min<10) {
       min = '0'+min
   }
   return time = hour + 'h' + min
}

export const getCurrentDate = () =>{
   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!
   var yyyy = today.getFullYear();

   if(dd<10) {
       dd = '0'+dd
   }

   if(mm<10) {
       mm = '0'+mm
   }

   return today = mm + '/' + dd + '/' + yyyy;
  }

  //  generic function to fetch data from api
  const fetchData = (loader=true, url, method, data={}, successCallBack, errorCallBack){
    return (dispatch) => {
      API[method.toLowerCase()](url, data)
        .then(response => successCallBack(dispatch, response))
        .catch(error => errorCallBack(dispatch, error))
    }
  }
