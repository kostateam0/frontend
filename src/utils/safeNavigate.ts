// src/utils/safeNavigate.ts
export const safeNavigate = (navigateFn: (path: string) => void, path: string) => {
    const isElectron = navigator.userAgent.toLowerCase().includes("electron");
  
    if (isElectron) {
      window.location.hash = `#${path.startsWith("/") ? path : "/" + path}`;
    } else {
      navigateFn(path);
    }
  };
  