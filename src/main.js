var Apps = {};

Apps = JSON.parse(localStorage.getItem('apps') || '');

function save()
{
    localStorage.setItem('apps', JSON.stringify(Apps));
}

function addApp()
{
    var urlName = $('#nameInput').value;
    var urlInput = $('#urlInput').value;

    if (!urlInput || !urlInput.startsWith('http') || urlInput.length < 9)
    {
        swal('Insira uma URL válida!', 'Erro', 'error');
        return;
    }
    if (!urlName || urlName.length < 3)
    {
        swal('Insira um nome válido e maior que 2 caracteres!', 'Erro', 'error');
        return;
    }
    if (Apps[urlName])
    {
        swal('Já existe uma URL cadastrada com esse nome!', 'Erro', 'error');
        return;
    }

    Apps[urlName] = urlInput;

    localStorage.setItem('apps', JSON.stringify(Apps));
    location.reload();
}

function setApp(url, openW)
{
    if (openW)
    {
        window.open(url, '_blank', 'left=0,top=0');
    }
    else
    {
        location.replace(url);
    }
}

var clickedButton;
var clickedApp;

// display apps
var appKeys = Object.keys(Apps);

appKeys.forEach(app => {
    console.log(app);
    var el = document.createElement('p');
    $('.app-container').appendChild(el);
    var url = Apps[app];
    el.outerHTML = `<button class="app btn btn-primary" onclick="setApp('${url}', openWindow)" onmouseup="clickedButton = this;clickedApp='${app}';">
    <img src="${'http://www.google.com/s2/favicons?domain=' + encodeURIComponent(url.substring(url.indexOf('://')+3))}">
    ${app}&nbsp</button>&nbsp`;
});

if (location.search.includes('?openApp='))
{
    var json = location.search.substring(location.search.indexOf('=')+1);
    var obj = JSON.parse(decodeURIComponent(json));
    setApp(obj.url, obj.win);
    location.search = '';
    window.close();
}

function menuRemove()
{
    delete Apps[clickedApp];
    clickedButton.outerHTML = '';
    save();
}

function copy(txt)
{
    $('#copy').setAttribute('value', txt);
    $('#copy').select();
    $('#copy').setSelectionRange(0, 99999);
    document.execCommand('copy');
}

function menuCopyURL()
{
    copy(Apps[clickedApp]);
}

function menuCopyOpenURL()
{
    copy(location.href.replace('?' + location.search, '') + '?openApp=' + encodeURIComponent(JSON.stringify({url: Apps[clickedApp], win: openWindow})) );
}