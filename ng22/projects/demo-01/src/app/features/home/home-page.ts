import { Component, signal } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Sample } from './components/sample/sample';

@Component({
  selector: 'ind-home-page',
  imports: [Sample, Card,],
  template: `
   <h2>{{ pageTitle() }}</h2>

      <ind-card>
        <ind-sample />
      </ind-card>
   `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class HomePage {
    protected readonly pageTitle = signal('Home');
}

