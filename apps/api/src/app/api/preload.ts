import { contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electron', {
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    platform: process.platform,
    getFile: ()=> ipcRenderer.invoke('get-file-path'),
    send: (channel:string, wowPath:string)=> ipcRenderer.send(channel, wowPath)
});
