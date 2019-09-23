Launch Android Studio
create an emulator
launch emulator
react-native run-android

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
