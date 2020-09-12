import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@shared-material/shared-material.module';
import { EnvironmentService } from '@shared/services/environment.service';

import { RepoInfoComponent } from './components/repo-info/repo-info.component';

@NgModule({
  declarations: [RepoInfoComponent],
  imports: [CommonModule, SharedMaterialModule],
  providers: [EnvironmentService],
  exports: [RepoInfoComponent],
})
export class SharedModule {}
