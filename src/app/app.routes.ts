import { Routes } from '@angular/router';
import { CounterComponent } from './features/counter/counter.component';
import { SettingsPanelComponent } from './features/settings/settings.component';
import { RxjsDemoComponent } from './features/rxjs-operators/rxjs-operators.component';

export const routes: Routes = [
  { path: '', redirectTo: 'counter', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  {
    path: 'settings',
    component: SettingsPanelComponent,
  },
  {
    path: 'rxjs-operators',
    component: RxjsDemoComponent,
  },
];
