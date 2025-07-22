import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);

  increment() {
    this.count.set(this.count() + 1);
  }

  decrement() {
    this.count.set(this.count() - 1);
  }

  reset() {
    this.count.set(0);
  }
}
