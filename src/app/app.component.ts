import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {} from './features/settings/settings.component';
import { ThemeService } from './core/theme/theme.service';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _themeService: ThemeService) {}
  title = 'signals-demo';
}
