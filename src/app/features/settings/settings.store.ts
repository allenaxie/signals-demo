import { computed, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';
type Language = 'en' | 'es' | 'cn';

@Injectable({
  providedIn: 'root',
})
export class SettingsStore {
  private theme = signal<Theme>('light');
  private language = signal<Language>('en');

  // Expose public readonly signals
  currentTheme = computed(() => this.theme());
  currentLanguage = computed(() => this.language());

  // Methods to update the settings
  toggleTheme() {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  setLanguage(language: Language) {
    this.language.set(language);
  }
}
