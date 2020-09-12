import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@shared-material/shared-material.module';
import { SharedModule } from '@shared/shared.module';

import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [FavoritesPageComponent, FavoriteCardComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    SharedMaterialModule,
  ],
})
export class FavoritesModule {}
