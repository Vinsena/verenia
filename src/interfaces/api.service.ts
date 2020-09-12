import { Observable } from 'rxjs';

import { Language } from './i-language';
import { IRepo } from './i-repo';

export abstract class ApiService {
  abstract search(searchStr: string): Observable<IRepo[]>;

  abstract getLanguages(): Observable<Language[]>;
}
