import { Component, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { Counter } from '../counter/counter';

@Component({
  selector: 'ind-counter-list',
  imports: [Card, Counter],
  template: `
    <p>Valor total: {{ totalValue() }}</p>
    <p>Total de clicks : {{ totalClicks() }}</p>
    <div>
      <ind-card [title]="title()">
        <ind-counter (countEvent)="counterChange($event)" />
      </ind-card>
      <ind-card [title]="title()">
        <ind-counter (countEvent)="counterChange($event)" />
      </ind-card>
    </div>
  `,
  styles: `
    div {
      display: flex;
      gap: 1rem;
    }
  `,
})
export class CounterList {
  protected readonly title = signal({ title: 'Contador', level: 3 as const });
  protected readonly totalValue = signal(0);
  protected readonly totalClicks = signal(0);

  protected counterChange(delta: number) {
    this.totalValue.update((current) => current + delta);
    this.totalClicks.update((current) => current + 1);
  }
}
