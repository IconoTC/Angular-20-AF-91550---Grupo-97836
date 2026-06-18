import { Component, signal } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Sample } from './components/sample/sample';
import { Terms } from './components/terms/terms';

@Component({
  selector: 'ind-home-page',
  imports: [Sample, Terms, Card],
  template: `
    <section class="page">
      <h2>{{ pageTitle() }}</h2>
      <ind-card>
        <ind-sample />
      </ind-card>
      <ind-card>
        <ind-terms />
      </ind-card>
    </section>
  `,
  styleUrls: ['../pages.css'],
  styles: `
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
}
