var withCompanyCode = function(url, companyCode) {
    var query = 's=' + companyCode;
    var ROOM_ID_SEPARATOR = '#!';
    if (url.indexOf(query) < 0) {
        if (url.indexOf(ROOM_ID_SEPARATOR) >= 0) {
            var urls = url.split(ROOM_ID_SEPARATOR);
            return urls[0] + '&' + query + ROOM_ID_SEPARATOR + urls[1];
        }
        return url + '&' + query;
    }
    return url;
};

var companyCode;

var loadCompanyCode = function () {
    chrome.storage.sync.get({
        companyCode: null
    }, function (items) {
        if (!items.companyCode) {
            alert(chrome.i18n.getMessage('alertInputLoginUrl'));
            chrome.runtime.openOptionsPage(function () {
            });
            return;
        }
        companyCode = items.companyCode;
    });
};
loadCompanyCode();

chrome.storage.onChanged.addListener(function(changes, namespace) {
    var changedCompanyCode = changes['companyCode'];
    if (changedCompanyCode) {
        companyCode = changedCompanyCode.newValue;
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (!companyCode) {
            loadCompanyCode();
            return;
        }
        return {redirectUrl: withCompanyCode(details.url, companyCode)};
    },
    {
        urls: ['*://kcw.kddi.ne.jp/login.php*'],
        types: ['main_frame']
    },
    ["blocking"]
);
