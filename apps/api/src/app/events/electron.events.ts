/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, dialog, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import wow from '@wow/wow-lib';
import * as Store from 'electron-store'

const store = new Store()
export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', (event) => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});
ipcMain.handle('get-file-path', async (event) => {
  const files = await dialog.showOpenDialog({
    title: 'choose file',
    properties: ['openFile'],
  });
  return files;
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});

ipcMain.on('init', (event, wowPath: string) => {
  wow.initialize(wowPath);
});

ipcMain.on('normalGame', (event, wowPath: string) => {
  wow.normalGame(wowPath);
});
ipcMain.on('battleGround', (event, wowPath: string) => {
  wow.battleGround(wowPath);
});
ipcMain.on('battlePet', (event, wowPath: string) => {
  wow.battlePet(wowPath);
});

ipcMain.handle('set-wow-path', (event, wowPath: string) => {
  store.set('wow-path', wowPath);
});

ipcMain.handle('get-wow-path', (event) => {
  const wowPath = store.get('wow-path')
  return wowPath
});
