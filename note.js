//chrome.tabs.getCurrent

var noteArea = document.getElementById('note');
var tabIDText = document.getElementById('tabIDText');
var currentTabID;
var storageKey;
var init = false;

var onTabLoaded = function () {
	console.log('starting');
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function (tabs) {
		var tab = tabs[0];
		currentTabID = tab.id;
		storageKey = 'tabNote' + currentTabID;
		tabIDText.innerHTML = currentTabID;
		init = true;
		var storedNote = localStorage.getItem(storageKey);
		if (storedNote !== undefined) {
			noteArea.value = storedNote;
		}
	});
};

var onNoteChanged = function () {
	if (init) {
		localStorage[storageKey] = noteArea.value;
		console.log('changing note to ' + noteArea.value);
	}
};

document.addEventListener('DOMContentLoaded', onTabLoaded);
noteArea.onkeyup = onNoteChanged;
noteArea.onblur = onNoteChanged;

