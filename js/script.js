var nw = require('nw.gui');
var win = nw.Window.get();

var tray;

win.on('focus', function() {
    $('#new-task').focus();
});

win.on('minimize', function() {
    this.hide();
    tray = new nw.Tray({icon:'icon.png'});
    tray.on('click', function() {
        win.show();
        this.remove();
        tray = null;
    });
});

nw.Window.get().showDevTools()