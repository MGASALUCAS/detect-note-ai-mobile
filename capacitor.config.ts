
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.3ee88d7b29f2499187013a5e1b902930',
  appName: 'Currency Validator AI',
  webDir: 'dist',
  server: {
    url: 'https://3ee88d7b-29f2-4991-8701-3a5e1b902930.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
