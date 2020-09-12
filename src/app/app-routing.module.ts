import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsUserAuthorizedGuard } from '@auth/guards/is-user-authorized.guard';

const routes: Routes = [
  {
    path: 'favorites',
    loadChildren: () =>
      import('../modules/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
    canLoad: [IsUserAuthorizedGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
