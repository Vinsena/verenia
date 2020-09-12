import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '@shared/services/environment.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { parse } from 'yaml';

import { ApiService } from '../../../interfaces/api.service';
import { IReposDto, IReposItem } from '../../../interfaces/i-dto';
import { Language, LanguageDto } from '../../../interfaces/i-language';
import { IRepo } from '../../../interfaces/i-repo';

@Injectable()
export class HttpApiService extends ApiService {
  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    super();
  }

  search(searchStr: string): Observable<IRepo[]> {
    const url = `${this.environment.getValue('apiUrl')}/search/repositories`;
    const params = new HttpParams().append('q', searchStr);

    return this.http
      .get<any>(url, { params })
      .pipe(switchMap((data: IReposDto) => this.tryConvertDto(data)));
  }

  getLanguages(): Observable<Language[]> {
    const url = this.environment.getValue('getLanguagesUrl');
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((yaml) => parse(yaml)),
      map((dto: LanguageDto) => this.toLanguagesArray(dto))
    );
  }

  private tryConvertDto(data: IReposDto): Observable<IRepo[]> {
    if (!data || !data.items) {
      return of([]);
    }

    return this.getLanguages().pipe(
      map((languages: Language[]) => this.convertDto(data, languages))
    );
  }

  private convertDto(data: IReposDto, languages: Language[]): IRepo[] {
    return data.items.map((repoDto: IReposItem) =>
      this.convertRepo(repoDto, languages)
    );
  }

  private convertRepo(repoDto: IReposItem, languages: Language[]): IRepo {
    const language = languages.find(
      (lang: Language) => lang.name === repoDto.language
    );
    return {
      id: repoDto.id,
      name: repoDto.name,
      language,
      url: repoDto.html_url,
      owner: {
        avatarUrl: repoDto.owner.avatar_url,
        login: repoDto.owner.login,
      },
      description: repoDto.description,
    } as IRepo;
  }

  private toLanguagesArray(dto: LanguageDto): Language[] {
    return Object.keys(dto).map((lang: string) => {
      return {
        name: lang,
        color: dto[lang].color,
      } as Language;
    });
  }
}
