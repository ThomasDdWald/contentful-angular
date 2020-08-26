import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { BlockComponent } from '../page-renderer/content-block';
import { CtaContentModel } from '../../../lib/core/models/content-model';

@Component({
  selector: 'tux-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements BlockComponent, OnChanges {
  @Input() content: CtaContentModel;
  routerLink;

  ngOnChanges() {
    if (this.content.isModal) {
      this.routerLink = [{ outlets: { modal: [this.content.url] } }];
    } else {
      this.routerLink = this.content.url;
    }
  }
}
