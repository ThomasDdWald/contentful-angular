import { Pipe, PipeTransform } from '@angular/core';
import {ContentfulService} from '../core/modules/contentful/contentful.service';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {
  constructor(private contentful: ContentfulService) { }

  transform(value: string): unknown {
    return this.contentful.markdownToHtml(value);
  }

}
