import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IRepo } from '../../../../interfaces/i-repo';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCardComponent {
  @Input() data: IRepo;
  @Output() unmarkedAsFavorite = new EventEmitter<IRepo>();

  constructor() {}

  removeFromFavorites(): void {
    this.unmarkedAsFavorite.emit(this.data);
  }
}
