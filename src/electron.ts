import ApplicationConfig from '@/config';

export let electron: any = undefined;
if (window && window.require) {
  electron = window.require('electron');
}
export const electronRemote = electron?.remote;
export const electronApp = electron?.remote?.app;

if (electron) {
  ApplicationConfig.useElectron = true;
}
