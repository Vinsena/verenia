import { Injectable } from '@angular/core';
import { Notification } from '@shared/models/notification.model';
import { NotificationTypes } from '@shared/models/notification.type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification = new Subject<Notification>();
  notification$ = this.notification.asObservable();

  constructor() {}

  error(text: string): void {
    const data = {
      message: text,
      duration: 5000,
      type: NotificationTypes.ERROR,
    } as Notification;
    this.notification.next(data);
  }

  success(text: string): void {
    const data = {
      message: text,
      duration: 3000,
      type: NotificationTypes.SUCCESS,
    } as Notification;
    this.notification.next(data);
  }
}
