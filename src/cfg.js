const OPENWIN_CHECK = $('#openWindow');

OPENWIN_CHECK.checked = (localStorage['openWin'] || 'false') == 'false' ? false : true;

var openWindow = OPENWIN_CHECK.checked;

OPENWIN_CHECK.addEventListener('change', () => {
    localStorage['openWin'] = OPENWIN_CHECK.checked + '';
    openWindow = OPENWIN_CHECK.checked;
    console.log(OPENWIN_CHECK.checked)
});