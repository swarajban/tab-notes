var noteArea = document.getElementById('note');
var tabIDText = document.getElementById('tabIDText');
var currentTabID;
var storageKey;
var init = false;

var onTabLoaded = function () {
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function (tabs) {
		var tab = tabs[0];
		if (tab.url) {
			currentTabID = tab.id;
			storageKey = getStorageKey(tab);
			tabIDText.innerHTML = currentTabID;
			init = true;

			// Load note value from chrome.storage.sync
			chrome.storage.sync.get(storageKey, function (result) {
				if (storageKey in result) {
					noteArea.value = result[storageKey];
					togglePageIcon(true, currentTabID);
				} else {
					togglePageIcon(false, currentTabID);
				}
			});
		}
	});
};

var onNoteChanged = function () {
	if (init) {
		var newNoteValue = noteArea.value;
		if (newNoteValue === '') {
			chrome.storage.sync.remove(storageKey);
		} else {
			var newNoteData = {};
			newNoteData[storageKey] = newNoteValue;
			chrome.storage.sync.set(newNoteData);
		}
	}
};

var onStorageChanged = function (changes, areaName) {
	if (areaName === 'sync') {
		// change page icon based on whether note is full
		if (storageKey in changes && changes[storageKey].newValue) {
			var newValue = changes[storageKey].newValue;
			noteArea.value = newValue;
			togglePageIcon(true, currentTabID);
		} else {
			togglePageIcon(false, currentTabID);
		}
	}
};


chrome.storage.onChanged.addListener(onStorageChanged);

document.addEventListener('DOMContentLoaded', onTabLoaded);
noteArea.onkeyup = onNoteChanged;
noteArea.onblur = onNoteChanged;

