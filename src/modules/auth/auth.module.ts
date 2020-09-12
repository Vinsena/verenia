import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsUserAuthorizedGuard } from './guards/is-user-authorized.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  providers: [AuthService, IsUserAuthorizedGuard],
  imports: [CommonModule],
})
export class AuthModule {}
