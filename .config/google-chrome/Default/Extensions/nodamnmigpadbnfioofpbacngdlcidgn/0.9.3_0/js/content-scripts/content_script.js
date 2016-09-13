window.onload = function () {
	var isInstalledNode = document.createElement('div');
	isInstalledNode.id = 'InMeetingExtensionIsInstalled';
	isInstalledNode.className = 'InMeetingExtensionIsInstalled';
	try {
		isInstalledNode.setAttribute('data-extension-id', chrome.runtime.id);
	} catch(e) {
		console.log('Exception while trying to set chrome extension ID');
	}
	document.body.appendChild(isInstalledNode);
}