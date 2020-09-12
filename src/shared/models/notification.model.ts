import { NotificationTypes } from '@shared/models/notification.type';

export class Notification {
  message: string;
  duration: number;
  type: NotificationTypes;
}
