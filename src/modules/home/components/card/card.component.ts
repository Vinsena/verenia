import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IRepo } from '../../../../interfaces/i-repo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() data: IRepo;
  @Input() isFavorite: boolean;
  @Output() markedAsFavorite = new EventEmitter<IRepo>();
  @Output() unmarkedAsFavorite = new EventEmitter<IRepo>();

  addToFavorites(): void {
    this.markedAsFavorite.emit(this.data);
  }

  removeFromFavorites(): void {
    this.unmarkedAsFavorite.emit(this.data);
  }
}
