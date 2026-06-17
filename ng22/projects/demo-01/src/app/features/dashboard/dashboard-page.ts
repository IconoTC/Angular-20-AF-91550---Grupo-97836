import { Component, signal } from '@angular/core';

@Component({
  selector: 'ind-dashboard-page',
  imports: [],
  template: ` <h2>{{ pageTitle() }}</h2> `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class DashboardPage {
    protected readonly pageTitle = signal('Dashboard');
}
