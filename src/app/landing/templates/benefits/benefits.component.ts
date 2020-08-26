import { Component } from '@angular/core';
import {BlockComponent} from '../page-renderer/content-block';
import {BenefitsContentModel} from '../../../lib/core/models/content-model';

@Component({
  selector: 'tux-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BlockBenefitsComponent implements BlockComponent {
  content: BenefitsContentModel;
}


