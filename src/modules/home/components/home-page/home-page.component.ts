import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from '@shared/services/notification.service';
import { ReposService } from '@shared/services/repos.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';

import { ApiService } from '../../../../interfaces/api.service';
import { Language } from '../../../../interfaces/i-language';
import { IRepo } from '../../../../interfaces/i-repo';
import { IRepos } from '../../../../interfaces/i-repos';

const SEARCH_DEBOUNCE_TIME = 1000;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  searchInputControl = new FormControl();
  languageControl = new FormControl();
  languages: Language[] = [];
  filteredRepos: IRepo[];
  favoriteRepos: Observable<IRepos>;
  isLoading: boolean;

  private repos: IRepo[];

  private set loading(loading: boolean) {
    this.isLoading = loading;
    this.cdRef.markForCheck();
  }

  constructor(
    private reposService: ReposService,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToSearchInput();
    this.favoriteRepos = this.reposService.favorite$;
  }

  addToFavorites(repo: IRepo): void {
    this.reposService.saveRepo(repo);
  }

  removeFromFavorites(repo: IRepo): void {
    this.reposService.deleteSavedRepo(repo.id);
  }

  private subscribeToSearchInput(): void {
    this.searchInputControl.valueChanges
      .pipe(
        filter(Boolean),
        debounceTime(SEARCH_DEBOUNCE_TIME),
        switchMap((searchStr: string) => this.loadRepos(searchStr)),
        tap((data: IRepo[]) => this.updateLanguages(data)),
        untilDestroyed(this)
      )
      .subscribe((data: IRepo[]) => {
        this.repos = data;
        this.filterRepos();
      });

    this.languageControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((lang: Language) => {
        this.filterRepos();
      });
  }

  private filterRepos(): void {
    this.filteredRepos = this.filterByLanguage(
      this.repos,
      this.languageControl.value
    );
    this.cdRef.markForCheck();
  }

  private filterByLanguage(repos: IRepo[], lang: Language): IRepo[] {
    if (!lang || !lang.name) {
      return repos;
    }

    return repos.filter(
      (repo) => repo.language && repo.language.name === lang.name
    );
  }

  private updateLanguages(data: IRepo[]): void {
    this.languageControl.reset();
    const anyLang = { name: '', color: '' } as Language;

    const reposLanguages = data
      .filter((r: IRepo) => r.language)
      .map((r: IRepo) => r.language.name);

    const uniqLanguages = reposLanguages.filter(
      (lang, i) => reposLanguages.indexOf(lang) === i
    );

    this.apiService
      .getLanguages()
      .pipe(untilDestroyed(this))
      .subscribe(
        (languages: Language[]) => {
          const filteredLanguages = languages.filter((l) =>
            uniqLanguages.includes(l.name)
          );
          this.languages = [anyLang, ...filteredLanguages];
          this.cdRef.markForCheck();
        },
        (error) =>
          this.notificationService.error(
            error.message || 'Languages loading failed'
          )
      );
  }

  private loadRepos(searchStr: string): Observable<IRepo[]> {
    this.loading = true;
    return this.reposService
      .getRepos(searchStr)
      .pipe(finalize(() => (this.loading = false)));
  }

  // ngx-take-until-destroy requires onDestroy
  ngOnDestroy(): void {}
}
