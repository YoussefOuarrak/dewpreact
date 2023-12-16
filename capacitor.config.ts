import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.learnme.com',
  appName: 'learn me',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
