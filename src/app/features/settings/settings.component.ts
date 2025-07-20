import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsStore } from './settings.store';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule],
  template: `
    <h2>Settings</h2>

    <div>
      <p>Theme: {{ settings.currentTheme() }}</p>
      <button (click)="settings.toggleTheme()">Toggle Theme</button>
    </div>

    <div>
      <p>Language: {{ settings.currentLanguage() }}</p>
      <button (click)="settings.setLanguage('en')">English</button>
      <button (click)="settings.setLanguage('es')">Español</button>
      <button (click)="settings.setLanguage('cn')">中文</button>
    </div>
  `,
})
export class SettingsComponent {
  constructor(public settings: SettingsStore) {}
}
