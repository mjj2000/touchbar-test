'use strict';

const electron = require('electron');
const TouchBar = electron.TouchBar;
const {
	TouchBarLabel,
} = TouchBar;
var app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;


const up = {
  label: '👍 推',
  textColor: '#3eb54b',
};

const down = {
  label: '👎 噓',
  textColor: '#cd2c21',
};

const right = {
  label: '👉 平',
  textColor: '#a7aaa4',
};

const items = [
	up,
	right,
	down,
];

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 200,
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();

	const touchBarLabel = new TouchBarLabel();
	mainWindow.setTouchBar(new TouchBar([
		touchBarLabel,
	]));
	setInterval(() => {
		const index = (new Date()).getSeconds() % items.length;
		touchBarLabel.label = items[index].label;
		touchBarLabel.textColor = items[index].textColor;
	}, 1000);
});
