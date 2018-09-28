const body = new FormData();

 //String Key value pair appending to body
 body.append('KEY', VALUE);
 body.append('KEY', VALUE);
 body.append('KEY', VALUE);

 //Appending file to body
 body.append(KEY_AS REQUIRED_IN_SERVICE, {
         uri: PASS_URI_OF_THE_FILE,
         type: 'image/jpeg', //This is the file type .. you can define according to your requirement
         name: 'photo.jpg',   //File name you want to pass
     })
 //Service call
 fetch(YOUR_URL, {
     method: 'POST',
     headers: new Headers({
         YOUR_HEADER_PARAMS
     }),
     body: body
 })
     .then(res => res.json())
     .then((responseJson) => {

        //GET RESPONSE SUCCESS OF FAILURE

     })
     .catch((error) => {
        //ERROR
     });
}
