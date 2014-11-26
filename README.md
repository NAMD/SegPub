# Setup the dev environment

The first step is [install nodejs](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

Second, install `grunt` globally in order to run frontend and test tasks:

```bash
$ sudo npm install -g grunt
```

After that, install node modules:

```bash
$ npm install
```

To run the app, use the default `start` script:

```bash
$ npm start
```

If the app couldn't find the csv data locally, it will be downloaded during the bootstrap. In this case, wait until the data is ready to use the app.

Similarly, to run tests:

```bash
$ npm test
```
