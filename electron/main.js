
const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // ایجاد پنجره اصلی
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, '../public/lovable-uploads/045f5698-67df-4c57-ba47-ead9a49ac21d.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    show: false
  });

  // بارگیری فایل HTML
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // نمایش پنجره بعد از آماده شدن
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // فوکوس خودکار
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // مدیریت بستن پنجره
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // باز کردن لینک‌های خارجی در مرورگر
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// منوی اپلیکیشن
function createMenu() {
  const template = [
    {
      label: 'دیجی‌کتاب',
      submenu: [
        {
          label: 'درباره دیجی‌کتاب',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'درباره دیجی‌کتاب',
              message: 'دیجی‌کتاب - کتابخانه دیجیتال فارسی',
              detail: 'نسخه 1.0.0\nکتابخانه دیجیتال کامل با قابلیت مطالعه آفلاین'
            });
          }
        },
        { type: 'separator' },
        {
          label: 'خروج',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'ویرایش',
      submenu: [
        { label: 'برش', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'کپی', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'چسباندن', accelerator: 'CmdOrCtrl+V', role: 'paste' }
      ]
    },
    {
      label: 'نمایش',
      submenu: [
        { label: 'بازگردانی', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'بازگردانی اجباری', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { label: 'ابزار توسعه‌دهنده', accelerator: 'F12', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'بزرگ‌نمایی', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: 'کوچک‌نمایی', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: 'اندازه عادی', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'تمام صفحه', accelerator: 'F11', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'پنجره',
      submenu: [
        { label: 'کمینه کردن', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        { label: 'بستن', accelerator: 'CmdOrCtrl+W', role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// رویدادهای اپلیکیشن
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('show-save-dialog', async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'ذخیره فایل',
    defaultPath: 'backup.json',
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  return result;
});

ipcMain.handle('show-open-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'انتخاب فایل',
    properties: ['openFile'],
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  return result;
});
