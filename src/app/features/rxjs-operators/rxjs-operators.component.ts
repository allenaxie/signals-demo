import { Component } from '@angular/core';
import {
  Subject,
  exhaustMap,
  Observable,
  of,
  delay,
  switchMap,
  mergeMap,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-operators.component.html',
})
export class RxjsDemoComponent {
  private counter = 1;
  logs: string[] = [];

  private click$ = new Subject<string>();

  constructor() {
    // 💡 You can comment/uncomment these to test one at a time

    this.click$
      .pipe(
        // 🔄 switchMap:
        // switchMap((label) => this.fakeHttp(label))

        // 🔁 mergeMap:
        // mergeMap((label) => this.fakeHttp(label))

        // 🛑 exhaustMap:
        exhaustMap((label) => this.fakeHttp(label))
      )
      .subscribe((result) => {
        this.logs.push(result);
        console.log('logs:', this.logs);
      });
  }

  onSwitchMapClick() {
    this.click$.next(`switchMap-${this.counter++}`);
  }

  onMergeMapClick() {
    this.click$.next(`mergeMap-${this.counter++}`);
  }

  onExhaustMapClick() {
    this.click$.next(`exhaustMap-${this.counter++}`);
  }

  fakeHttp(label: string): Observable<string> {
    this.logs.push(`▶️ Started: ${label}`);
    return of(`✅ Done: ${label}`).pipe(delay(2000));
  }
}
