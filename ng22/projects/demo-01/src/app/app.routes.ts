import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home | Demo 01',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Demo 01',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
  },
  {
    path: 'notes',
    title: 'Notes | Demo 01',
    data: {
      label: 'Notes',
    },
    loadComponent: () => import('./features/notes/notes-page'),
    children: [
      {
        path: 'details/:id',
        title: 'Note Details | Demo 01',
        data: {
          label: 'Note Details',
        },
        loadComponent: () => import('./features/notes/notes-page'),
        // loadComponent: () => import('./features/notes/note-details-page'),
      },
    ],
  },
  {
    path: 'about',
    title: 'About | Demo 01',
    data: {
      label: 'About Angular',
    },
    loadComponent: () => import('./features/about/about-page'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

export const getRoutes = (): MenuOption[] => {
  return routes
    .filter((route) => route.data?.['label'])
    .map((route) => ({
      label: route.data?.['label'] as string,
      path: route.path as string,
    }));
};
