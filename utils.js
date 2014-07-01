var EMPTY_NOTEPAD = {
	"19": "images/notepadEmpty19.png",
	"38": "images/notepadEmpty38.png"
};

var FULL_NOTEPAD = {
	"19": "images/notepadFull19.png",
	"38": "images/notepadFull38.png"
};

var getStorageKey = function (tab) {
	return md5(tab.url);
};

var togglePageIcon = function (showFull, tabID) {
	var pageActionIconData = {
		tabId: tabID
	};
	if (showFull) {
		pageActionIconData['path'] = FULL_NOTEPAD;
	} else {
		pageActionIconData['path'] = EMPTY_NOTEPAD;
	}
	chrome.pageAction.setIcon(pageActionIconData);
};
