MANAGE ENV VARIABLES
https://dev.to/calintamas/how-to-manage-staging-and-production-environments-in-a-react-native-app-4naa

Launch Android Studio
create an emulator
launch emulator
react-native run-android
http://192.168.43.92:3000
For Network request to work with no debugger :
you must send request to your private IP (ifconfig |grep inet next to inet)
You must run your server on the private IP rails server -b 192.168.43.92 -p 3000

FORMDATA AND UPLOAD FILE WILL NEVER WORK WITH DEBUGGER ! YOU MUST UPLOAD TO PRIVATE IP (https://www.youtube.com/watch?v=shstJgkLW-I)

TROUBLESHOOT :
error: bundling failed: Error: Unable to resolve module `react-native-tab-view` from `/Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/react-navigation/src/views/TabView/TabView.js`: Module `react-native-tab-view` does not exist in the Haste module map

This might be related to https://github.com/facebook/react-native/issues/4968
To resolve try the following:
  1. Clear watchman watches: `watchman watch-del-all`.
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
  3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.  4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.
    at ModuleResolver.resolveDependency (/Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/node-haste/DependencyGraph/ModuleResolution.js:161:1460)
    at ResolutionRequest.resolveDependency (/Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/node-haste/DependencyGraph/ResolutionRequest.js:91:16)
    at DependencyGraph.resolveDependency (/Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/node-haste/DependencyGraph.js:272:4579)
    at /Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/DeltaBundler/traverseDependencies.js:376:19
    at Array.map (<anonymous>)
    at resolveDependencies (/Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/DeltaBundler/traverseDependencies.js:374:16)
    at /Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/DeltaBundler/traverseDependencies.js:212:33
    at Generator.next (<anonymous>)
    at step (/Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/DeltaBundler/traverseDependencies.js:297:313)
    at /Users/davidgeismar/code/davidgeismar/serenis/timeo__mobile/node_modules/metro/src/DeltaBundler/traverseDependencies.js:297:473



RUN APP ON DEVICE :
SETTINGS
MIDI PROTOCOL FOR FILETRANSFER
ALLOW USB DEBUGGING
adb devices


https://stackoverflow.com/questions/35283959/build-and-install-unsigned-apk-on-device-without-the-development-server
1) react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

2) cd android/
./gradlew assembleDebug
3) cd app/build/outputs/apk/

to build the apk and immediately install it on connected device :
Or to build the APK and immediately install it on a running emulator or connected device, instead invoke installDebug :
gradlew installDebug




Ive been trying to create a release apk for my react-native app following those steps : https://facebook.github.io/react-native/docs/signed-apk-android.

    However when I run  `./gradlew assembleRelease`. I get this error :
    Task :app:processReleaseResources FAILED
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseResources'.
> Failed to process resources, see aapt output above for details.
