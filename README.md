# Creators of the Web Game (Dex App Framework)
This is one of the original concepts that Agorama thought of as a fun way to engage with Dat p2p apps. The object of the game is to fork this application (using the "create your own game" button) and start dragging and dropping as many pics of the individuals you believe helped create and shaped the web of today! Can you catch them all?

The framework for this game is developed in two parts. One part comes from a p2p photo sharing application by [Tara Vancil](https://twitter.com/taravancil), which used Beaker Browser's [DatArchive](https://beakerbrowser.com/docs/apis/dat). The second part is the [choo framework](https://choo.io/) with the handy use of the node global module [Browserify](https://github.com/browserify/browserify#usage). Through this combination this application is completely a frontend app. For instance, writing permissions to the sites filing system are completely taken care of through the DatArchive API without the use nodejs or other backend modules.

Please note that this app is still in development and will be slowly update, like the UI (which is ugly at the moment). As well the popup identifier to tell users that they can't use this app on Chrome or Firefox (sorry guy only Beaker!) stopped working recently...

## Getting up and running with choo on the front end
Requirements to run app without a node server and essentially as a front end app.... use Browserify

```
$ npm install -g browserify
```
not that this is a global installation that you will need on your system.... meaning you will have to have node and npm installed on your system before hand...

Once you have established that you do have node and are able to install packages into your desired app directory...
Run *inside* the target project dir:

```
$ npm init
```
after this install choo specifically for this for this project...

```
$ npm i choo
```
Please note at this stage of your project you will not be able to get your choo app running without configuring some type of server... This is where Browserify comes into play. Once you have established the basic file structure, i.e. index.js and index.html, plus assets and *beginnings* of your apps code (basically the just basic scribbles to see if things are running) run fron inside you project dir the code...

```
$ browserify index.js > bundle.js
```
Remember you *need* browserify installed for this to work. Essentially what browserify does is bundles (it seems on inspection) all of your apps code and require() calls so that your web app will function with all of its node modules *without* a node server.

PLEASE NOTE: you will have to run the command `$ browserify index.js > bundle.js` each time you update your code and want to see the changes. I understand this could be a bit annoying however its the easist way I have found without building a node server, integrating into your app, just to delete it to run browserify. Working from browserify from the beginnning of the app development process is...

## Forking this project through Dat and beaker browser...
An important installation note for this app if you are planning to fork it through the use of Dat or beaker... is to insure you have node, npm installed, AND browserify installed globally. If you don't please head to the node foundation to the install node and npm, then install browserify globally with npm (see command above).

Once this app has been forked you will notice a couple of things, first that the node modules folder needed to run the app are non existent. The other thing is that index.html has written in it `bundle.js` instead of `index.js`, and that there is no bundle.js file... This is because I have purposefully disallowed through the .datignore file both the modules folder and this file so that there is less of a problem to get up and running.

First run the command from the target app folder...

```
$ npm install
```
This should work perfectly fine as there is a package.json file accompanying the app. This should also take care of downloading choo - which is listed as a dependency. After that you will need to run the command from the same target folder....

```
$ browserify index.js > bundle.js
```
This will create the necessary bundle.js needed to run the app without a node server. The reason for running this a fresh is to make sure the bundle.js file is unique to the code you have on your local computer - rather than a pervious iteration of the file that might not reflect the code you have in front of you.

Now you should be able to run the application by simply running the index.html file in any browser of your choice.
