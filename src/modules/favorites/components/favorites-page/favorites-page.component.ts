import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReposService } from '@shared/services/repos.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRepo } from '../../../../interfaces/i-repo';
import { IRepos } from '../../../../interfaces/i-repos';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  favoriteRepos: Observable<IRepo[]>;

  constructor(private reposService: ReposService) {}

  ngOnInit() {
    this.favoriteRepos = this.reposService.favorite$.pipe(
      map((favorites: IRepos) => {
        return Object.keys(favorites).map((id) => favorites[id]);
      })
    );
  }

  removeFromFavorites(repo: IRepo): void {
    this.reposService.deleteSavedRepo(repo.id);
  }
}
