
const { contextBridge, ipcRenderer } = require('electron');

// API امن برای renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
  
  // اطلاعات پلتفرم
  platform: process.platform,
  isElectron: true
});

// جلوگیری از خطاهای امنیتی
window.addEventListener('DOMContentLoaded', () => {
  console.log('دیجی‌کتاب Electron آماده است');
});
