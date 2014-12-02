# Setup the dev environment

The first step is [install nodejs](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

Second, install `grunt` globally in order to run frontend and test tasks:

```bash
$ sudo npm install -g grunt
$ sudo npm install -g grunt-cli
```

After that, install node modules, download csv and start the app:

```bash
$ npm install
$ npm run get-data
$ npm start
```

Similarly, to run tests:

```bash
$ npm test
```
