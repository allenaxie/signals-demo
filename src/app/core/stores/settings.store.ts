import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'cn';

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private theme = signal<Theme>(this.load<Theme>('theme') ?? 'light');
  private language = signal<Language>(this.load<Language>('language') ?? 'en');

  readonly currentTheme = computed(() => this.theme());
  readonly currentLanguage = computed(() => this.language());

  constructor() {
    // Save theme when it changes
    effect(() => {
      this.save('theme', this.theme());
    });

    // Save language when it changes
    effect(() => {
      this.save('language', this.language());
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(t: Theme) {
    this.theme.set(t);
  }

  setLanguage(lang: Language) {
    this.language.set(lang);
  }

  // Save theme to localStorage
  private save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Load theme from localStorage
  private load<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  }
}
