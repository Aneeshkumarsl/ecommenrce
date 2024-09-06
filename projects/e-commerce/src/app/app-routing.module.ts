import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CONTAINERS } from './common/index';
const routes: Routes = [
  {
    path: '',
    component: CONTAINERS.LayoutComponentComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./Home/home-module/home-module.module').then((r) => r.HomeModuleModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./authModule/auth/auth.module').then((r) => r.AuthModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((r) => r.ProductModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./templates/templates.module').then((r) => r.TemplatesModule),
      },
    ]
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
