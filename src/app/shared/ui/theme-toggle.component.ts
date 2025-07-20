import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsStore } from 'src/app/core/stores/settings.store';

@Component({
  standalone: true,
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  template: `
    <button (click)="settings.toggleTheme()">
      Theme: {{ settings.currentTheme() }}
    </button>
  `,
})
export class ThemeToggleComponent {
  constructor(public settings: SettingsStore) {}
}
