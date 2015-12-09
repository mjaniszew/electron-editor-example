var app    = require('app');
var Window = require('browser-window');

app.on('ready', function () {
    var mainWindow = new Window({
        width: 800,
        height: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.openDevTools();
});

app.on('window-all-closed', function () {
    app.quit();
});
