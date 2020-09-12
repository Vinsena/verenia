import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CONFIGURATION } from '@shared/services/configuration.service';
import { ENVIRONMENT } from '@shared/services/environment.service';

import { config } from '../../configuration/config';
import { environment } from '../../environments/environment';
import { ApiService } from '../../interfaces/api.service';
import { HttpApiService } from './services/http-api.service';

@NgModule({
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    { provide: CONFIGURATION, useValue: config },
    { provide: ApiService, useClass: HttpApiService },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
