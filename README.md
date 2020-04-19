# footprints
A (soon to be) PWA for crowdsourcing path obstructions

# Install and Launch

You must have [npm](https://www.npmjs.com/get-npm) installed.

In the terminal, move into the top level directory of this project (containing package.json) and run:
```
npm install
```
After this command finishes running, run (also in the terminal):
```
npm start
```
This will compile the javascript code into the build folder and serve the built project from `http://localhost:9000` on the computer.

## Alternate installation

Download pre-bundled files from [this link](https://github.com/ryjo1026/footprints/releases/download/0.1.0/footprints.zip).

Serve up the files on port 9000 with any simple http server. We recommend using the built in Python server by running:

```
python3 -m http.server -b localhost 9000
```

within the directory that you unzipped the files to. Note that you must access the files from `http://localhost:9000` due to restrictions from the Google Maps API.
