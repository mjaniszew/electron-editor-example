var remote = require('remote');
var Menu   = remote.require('menu');
var dialog = remote.require('dialog');
var fs     = require('fs');
var currentWindow = remote.getCurrentWindow();

var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
var editorInstance = ace.edit("editor");

var mainMenu = Menu.buildFromTemplate([{}, {
    label: 'File',
    submenu: [{
        label: 'Open',
        click: openHandler
    }, {
        label: 'Save As',
        click: saveHandler
    }]
}]);
Menu.setApplicationMenu(mainMenu);

function openHandler () {
    var fileNames = dialog.showOpenDialog(currentWindow);
    if (fileNames !== undefined) {
        var fileName = fileNames[0];

        fs.readFile(fileName, 'utf8', function (err, data) {
            editorInstance = ace.edit("editor");
            editorInstance.setValue(data);
        });
    }
}

function saveHandler () {
    var fileName = dialog.showSaveDialog(currentWindow);
    if (fileName !== undefined) {
        fs.writeFile(fileName, editorInstance.getValue(), {
            encoding: 'utf8'
        });
    }
}

editorInstance.setTheme("ace/theme/twilight");
editorInstance.session.setMode(new JavaScriptMode());
