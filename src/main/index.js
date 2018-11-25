"use strict";
import { app, BrowserWindow, Menu, ipcMain } from "electron";
const electron = require("electron");

const log = require("electron-log");
const { autoUpdater } = require("electron-updater");

ipcMain.on("checked", data => {
  mainWindow.maximize();
});

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = `${(bytes / 1073741824).toFixed(2)} GB`;
  } else if (bytes >= 1048576) {
    bytes = `${(bytes / 1048576).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    bytes = `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes >= 1) {
    bytes = `${bytes} B`;
  }

  return bytes;
}

autoUpdater.on("checking-for-update", () => {
  sendMessageToFront("message", "checking", "Buscando actualizaciones");
});

autoUpdater.on("update-available", info => {
  sendMessageToFront("message", "available", "Version disponible");
});

autoUpdater.on("update-not-available", info => {
  sendMessageToFront(
    "message",
    "notAvailable",
    "No hay una nueva version disponible"
  );
});

autoUpdater.on("error", err => {
  sendMessageToFront("message", "error", `Error in auto-updater: ${err}`);
});

autoUpdater.on("update-downloaded", () => {
  sendMessageToFront("message", "done", "se bajo la actualizacion");
});

autoUpdater.on("download-progress", progressObj => {
  let percent = `${Math.floor(progressObj.percent)} %`;
  let downloaded = formatSizeUnits(progressObj.transferred);
  let total = formatSizeUnits(progressObj.total);
  sendMessageToFront(
    "message",
    "download",
    `${percent} (${downloaded} / ${total})`
  );
});

function startListenerUpdater() {
  ipcMain.on("start-connection", () => {
    sendMessageToFront("message", "start-listening", "Entablamos comunicacion");
    autoUpdater.checkForUpdates();
  });

  ipcMain.on("install", () => {
    autoUpdater.quitAndInstall();
  });
}

function sendMessageToFront(event, status, data) {
  console.info(`Message to send: ${event} - ${status} - ${data}`);
  mainWindow.webContents.send(event, { status, data });
}

const menuTemplate = [
  {
    label: "JJR",
    submenu: [
      {
        label: `Sobre JJR`,
        role: "about"
      },
      { type: "separator" },
      {
        label: "Ayuda",
        accelerator: "CmdOrCtrl+Shift+H",
        click: () => {
          electron.shell.openExternal("http://electron.atom.io");
        }
      },
      { type: "separator" },
      {
        label: "Salir",
        role: "quit"
      }
    ]
  },
  {
    label: "Expedientes",
    submenu: [
      {
        label: "Nuevo IPP",
        accelerator: "CmdOrCtrl+N",
        click: () => {
          sendMessageToFront("command", "new", "newIpp");
        }
      },
      { type: "separator" },
      {
        label: "Buscador",
        accelerator: "CmdOrCtrl+F",
        click: () => {
          sendMessageToFront("command", "search", "gsearch");
        }
      }
    ]
  },
  {
    label: "Herramientas",
    submenu: [
      {
        label: "Actualizar",
        accelerator: "CmdOrCtrl+Alt+U",
        click: () => {
          console.log("Here we call the updater");
        }
      }
    ]
  }
];

if (process.env.NODE_ENV === "development") {
  let sub = menuTemplate[2].submenu;
  sub.push({
    type: "separator"
  });
  sub.push({
    label: "Dev Tools",
    role: "toggledevtools"
  });
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minWidth: 1450,
    minHeight: 800,
    useContentSize: true,
    titleBarStyle: "hidden",
    backgroundColor: "#002b36",
    draggable: false
  });

  mainWindow.loadURL(winURL);

  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  mainWindow.setMenu(menu);

  mainWindow.on("closed", () => {
    app.quit();
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", () => {
  startListenerUpdater();
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
