import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsStore,
  Theme,
  Language,
} from 'src/app/core/stores/settings.store';

@Component({
    selector: 'app-settings-panel',
    imports: [CommonModule],
    template: `
    <h2>Settings</h2>

    <section>
      <p>
        Theme: <strong>{{ settings.currentTheme() }}</strong>
      </p>
      <button
        *ngFor="let t of themes"
        (click)="settings.setTheme(t)"
        [disabled]="settings.currentTheme() === t"
      >
        {{ t | titlecase }}
      </button>
    </section>

    <section>
      <p>
        Language: <strong>{{ settings.currentLanguage() }}</strong>
      </p>
      <button
        *ngFor="let lang of languages"
        (click)="settings.setLanguage(lang)"
        [disabled]="settings.currentLanguage() === lang"
      >
        {{ labelFor(lang) }}
      </button>
    </section>
  `
})
export class SettingsPanelComponent {
  constructor(public settings: SettingsStore) {}

  themes: Theme[] = ['light', 'dark'];
  languages: Language[] = ['en', 'es', 'cn'];

  labelFor(lang: Language) {
    return {
      en: 'English',
      es: 'Español',
      cn: '中文',
    }[lang];
  }
}
