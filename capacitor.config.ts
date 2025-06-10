
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.digiketab.app',
  appName: 'دیجی‌کتاب',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e40af",
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: "#1e40af"
    }
  }
};

export default config;
