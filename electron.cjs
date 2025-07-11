const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

function createWindow() {
  console.log("🟢 [Electron] createWindow called");

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      contextIsolation: true,
    },
  });

  const htmlPath = path.join(__dirname, "dist/index.html");
  console.log("📄 [Electron] Trying to load:", htmlPath);

  win.loadFile(htmlPath)
    .then(() => {
      console.log("✅ [Electron] index.html loaded successfully");
      win.webContents.openDevTools();
    })
    .catch((err) => {
      console.error("❌ [Electron] Failed to load index.html:", err);
    });
}

app.whenReady().then(() => {
  console.log("🚀 [Electron] App is ready");
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
