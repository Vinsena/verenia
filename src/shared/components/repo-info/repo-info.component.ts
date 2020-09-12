import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IRepo } from '../../../interfaces/i-repo';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoInfoComponent {
  @Input() data: IRepo;
}
