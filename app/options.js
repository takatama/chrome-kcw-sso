function m(message) {
    return chrome.i18n.getMessage(message);
}
function init() {
    document.querySelector('label[for="company-code"]').innerText = m('labelLoginUrl');
    document.querySelector('#save').innerText = m('labelSave');
    document.querySelector('#cancel').innerText = m('labelCancel');
    chrome.storage.sync.get({companyCode: ""}, function (items) {
        document.getElementById("company-code").value = items.companyCode;
    });
}
function save() {
    chrome.storage.sync.set({companyCode: document.getElementById("company-code").value}, function () {
        window.close();
    });
}
function cancel() {
    window.close();
}
document.addEventListener('DOMContentLoaded', init);
document.getElementById('save').addEventListener('click', save);
document.getElementById('cancel').addEventListener('click', cancel);
