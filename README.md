# My Spells

My Spells is an open source web-based application to elegantly view spells and save them to your local spellbook. 

## License

Open Game License v1.0a Copyright 2000, Wizards of the Coast, Inc.

App contains content from the SRD and is restricted and covered by the OGL. You can find the OGL 1.0a at [ogl.html](./ogl.html) in this app's repo, or [online here](http://www.opengamingfoundation.org/ogl.html). When using said data, please make sure to conform appropriately with the proper licenses and whatnot. 

## Credit

* ephe's [grimoire](https://github.com/ephe/grimoire/) spell list converted json by vorpalhex and cleaned up to meet OGL license standards [labeled under srd_spells](https://github.com/vorpalhex/srd_spells)
* Built on [Vue.js](https://vuejs.org/) and the [Quasar Framework](http://quasar-framework.org/)
* Logo magic wand icon by David from the Noun Project 

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev_web

# build for production with minification
$ npm run build_web # or build_app

# build cordova (android, iOS potentially in future) release
$ npm run build_app_cordova
# sign apk with android studio or jarsigner
# install on device
$ adp install cordova/platforms/android/build/apk/<BUILT-FILE.apk>

# lint code
$ npm run lint
```
