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
  // {
  //   path: 'products',
  //   title: 'Products | Demo 01',
  //   data: {
  //     label: 'Products',
  //   },
  //   loadComponent: () => import('./features/products/products-page'),
  //   children: [
  //     {
  //       path: 'details',
  //       title: 'Product Details | Demo 01',
  //       data: {
  //         label: 'Product Details',
  //       },
  //       loadComponent: () => import('./features/products/product-details-page'),
  //     },
  //   ],
  // },
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
