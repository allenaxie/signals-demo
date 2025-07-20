import { Injectable, signal, computed, effect } from '@angular/core';

// Define the Theme type
export type Theme = 'light' | 'dark';

// Define the Language type
export type Language = 'en' | 'es' | 'cn'; // Add or modify languages as needed

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private theme = signal<Theme>('light');
  private language = signal<Language>('en');

  readonly currentTheme = computed(() => this.theme());
  readonly currentLanguage = computed(() => this.language());

  constructor() {
    this.theme.set(this.load<Theme>('theme') ?? 'light');
    this.language.set(this.load<Language>('language') ?? 'en');

    effect(() => {
      this.save('theme', this.theme());
    });

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

  private save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private load<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  }
}
