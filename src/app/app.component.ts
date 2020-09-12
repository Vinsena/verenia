import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '@shared/models/notification.model';
import { NotificationService } from '@shared/services/notification.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.notificationService.notification$
      .pipe(untilDestroyed(this))
      .subscribe((data: Notification) => {
        this.openSnackBar(data);
      });
  }

  private openSnackBar(notification: Notification): void {
    this.snackBar.open(notification.message, null, {
      duration: notification.duration,
    });
  }

  // ngx-take-until-destroy requires onDestroy
  ngOnDestroy(): void {}
}
