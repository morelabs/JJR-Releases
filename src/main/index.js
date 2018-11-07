"use strict";
import { app, BrowserWindow, Menu, ipcMain } from "electron";
const electron = require("electron");

const log = require("electron-log");
const { autoUpdater } = require("electron-updater");

ipcMain.on("checked", data => {
  mainWindow.maximize();
});

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
        accelerator: "CmdOrCtrl+Alt+N",
        click: () => {
          sendMessageToFront("command", "newIpp");
        }
      },
      { type: "separator" },
      {
        label: "Buscador",
        accelerator: "CmdOrCtrl+Alt+F",
        click: () => {
          sendMessageToFront("command", "gsearch");
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

function sendMessageToFront(ev, text) {
  mainWindow.webContents.send(ev, { event: ev, message: text });
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
