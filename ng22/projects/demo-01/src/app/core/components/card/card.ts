import { Component } from '@angular/core';

@Component({
  selector: 'ind-card',
  imports: [],
  template: ` <ng-content /> `,
  styles: `
    :host {
      display: block;
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid var(--gray-400);
      border-radius: 8px;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  `,
})
export class Card {}
