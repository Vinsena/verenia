import { Injectable } from '@angular/core';
import { ConfigurationService } from '@shared/services/configuration.service';
import { Observable, of, throwError } from 'rxjs';
import { retry, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private config: ConfigurationService) {}

  askPassword(): Observable<boolean> {
    return this.prompt().pipe(
      switchMap((password: string) => {
        if (password === null) {
          return of(false);
        }
        return this.validatePassword(password);
      }),
      retry()
    );
  }

  private validatePassword(password: string): Observable<boolean> {
    const isValid = password === this.config.getValue('PASSWORD');
    if (!isValid) {
      return throwError('not valid');
    }
    return of(true);
  }

  private prompt(): Observable<string> {
    return new Observable<string>((subscriber) => {
      const password = prompt('Please enter your password', '');
      subscriber.next(password);
      subscriber.complete();
    });
  }
}
