import { Component, signal } from '@angular/core';
import { Counter } from './counter/counter';
import { Card } from "../../core/components/card/card";

@Component({
  selector: 'ind-dashboard-page',
  imports: [Counter, Card],
  template: `
    <h2>{{ pageTitle() }}</h2>
    <ind-card [title]="title()">
      <ind-counter />
    </ind-card>

    `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class DashboardPage {
    protected readonly pageTitle = signal('Dashboard');
    protected readonly title = signal({ title: 'Contador', level: 3 as const });

}
