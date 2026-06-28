import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arsyaf.taskmanager',
  appName: 'PersonalTaskManager',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;