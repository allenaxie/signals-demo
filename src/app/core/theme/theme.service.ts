import { Injectable, effect } from '@angular/core';
import { SettingsStore } from '../stores/settings.store';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private settings: SettingsStore) {
    // Reactively apply theme whenever it changes
    effect(() => {
      const theme = this.settings.currentTheme();
      document.documentElement.classList.toggle('dark', theme === 'dark');
    });
  }
}
