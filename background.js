
var updateTabs = function (tabID, chagneInfo, tab) {
	chrome.pageAction.show(tabID);
//	alert('updating tabs');
};

chrome.tabs.onUpdated.addListener(updateTabs);
