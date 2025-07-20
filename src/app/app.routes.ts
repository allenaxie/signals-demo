import { Routes } from '@angular/router';
import { CounterComponent } from './features/counter/counter.component';
import { SettingsPanelComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'counter', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  {
    path: 'settings',
    component: SettingsPanelComponent,
  },
];
