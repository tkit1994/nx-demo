import { OpenDialogReturnValue } from 'electron/main';
declare global {
  export interface Window {
    electron: {
      platform: typeof process.platform;
      getAppVersion: () => Promise<string>;
      getFile: ()=>Promise<OpenDialogReturnValue>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      send: (channel:string, wowPath:string)=>void;
      getWowPath: ()=>Promise<string>,
      setWowPath: (wowPath:string)=>Promise<void>
    };
  }
}
