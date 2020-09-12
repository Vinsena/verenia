import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '@home/components/card/card.component';
import { SharedMaterialModule } from '@shared-material/shared-material.module';
import { SharedModule } from '@shared/shared.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePageComponent, CardComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
