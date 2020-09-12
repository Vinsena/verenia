import { Injectable } from '@angular/core';
import { NotificationService } from '@shared/services/notification.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from '../../interfaces/api.service';
import { IRepo } from '../../interfaces/i-repo';
import { IRepos } from '../../interfaces/i-repos';

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  private favoriteRepos = new BehaviorSubject<IRepos>({});
  favorite$ = this.favoriteRepos.asObservable();

  private reposStorageKey = 'repos';

  get favorite(): IRepos {
    return this.favoriteRepos.value;
  }

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.favoriteRepos.next(this.getSavedRepos());
  }

  getRepos(searchValue: string): Observable<IRepo[]> {
    return this.apiService.search(searchValue).pipe(
      catchError((error) => {
        this.notificationService.error(
          error.message || 'Repositories loading failed'
        );
        return of(null);
      })
    );
  }

  saveRepo(data: IRepo): void {
    const repos = this.getSavedRepos();
    repos[data.id] = data;
    localStorage.setItem(this.reposStorageKey, JSON.stringify(repos));
    this.favoriteRepos.next(repos);
  }

  deleteSavedRepo(id: string): void {
    const repos = this.getSavedRepos();
    delete repos[id];
    localStorage.setItem(this.reposStorageKey, JSON.stringify(repos));
    this.favoriteRepos.next(repos);
  }

  getSavedRepos(): IRepos {
    const reposJson = localStorage.getItem(this.reposStorageKey);
    return reposJson ? JSON.parse(reposJson) : {};
  }
}
