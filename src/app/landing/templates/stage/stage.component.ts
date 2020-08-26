import { Component, Input } from '@angular/core';
import { BlockComponent } from '../page-renderer/content-block';
import { StageContentModel } from '../../../lib/core/models/content-model';
import { Router } from '@angular/router';


@Component({
  selector: 'tux-block-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class BlockStageComponent implements BlockComponent {
  @Input() content: StageContentModel;

  constructor(private router: Router) { }
}
