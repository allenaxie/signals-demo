import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'cn';

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private theme = signal<Theme>('light');
  private language = signal<Language>('en');

  readonly currentTheme = computed(() => this.theme());
  readonly currentLanguage = computed(() => this.language());

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(t: Theme) {
    this.theme.set(t);
  }

  setLanguage(lang: Language) {
    this.language.set(lang);
  }
}
