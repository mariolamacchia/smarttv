var fs = require('fs'),
    path = require('path'),
    storage = require('./storage'),
    mainWindow = require('./electron')(),
    apps = {};

// Loop through node_modules searching for apps with smarttv.json
var npmDir = path.join(__dirname, 'node_modules');
var modules = fs.readdirSync(npmDir);
modules.forEach(function(mod) {
    var ls = fs.readdirSync(path.join(npmDir, mod));
    if (ls.indexOf('smarttv.json') !== -1) {
        apps[mod] = require(path.join(npmDir, mod, 'smarttv.json'));
    }
});

showApp(storage.data.mainApp);

exports.list = apps;
exports.show = showApp;
exports.getCurrent = getCurrent;

function showApp(app) {
    storage.data.currentApp = app;
    mainWindow.loadURL(apps[app].tv);
}

function getCurrent() {
    return storage.data.currentApp;
}
