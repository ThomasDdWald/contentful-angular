import { Type } from '@angular/core';
import {BlockContentModel} from '../../../lib/core/models/content-model';


export interface BlockComponent {
  content: BlockContentModel;
}

export class ContentBlock {
  constructor(public component: Type<BlockComponent>, public content: any) {
  }
}
