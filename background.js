
var onTabUpdate = function (tabID, changeInfo, tab) {
	var tabURL = tab.url;
	if (tabURL) {
		var storageKey = getStorageKey(tab);
		chrome.storage.sync.get(storageKey, function (result) {
			if (storageKey in result) {
				togglePageIcon(true, tab.id);
			} else {
				togglePageIcon(false, tab.id)
			}
		});
	}
	chrome.pageAction.show(tabID);
};

var onTabActivated = function (activeInfo) {
	var tabID = activeInfo.tabId;
	chrome.tabs.get(tabID, function (tab) {
		onTabUpdate(tabID, null, tab);
	});
};

chrome.tabs.onUpdated.addListener(onTabUpdate);
chrome.tabs.onActivated.addListener(onTabActivated);

