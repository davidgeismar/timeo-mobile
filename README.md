Launch Android Studio
create an emulator
launch emulator
react-native run-android

For Network request to work with no debugger :
you must send request to your private IP (ifconfig |grep inet next to inet)
You must run your server on the private IP rails server -b 192.168.43.92 -p 3000

FORMDATA AND UPLOAD FILE WILL NEVER WORK WITH DEBUGGER ! YOU MUST UPLOAD TO PRIVATE IP (https://www.youtube.com/watch?v=shstJgkLW-I)
