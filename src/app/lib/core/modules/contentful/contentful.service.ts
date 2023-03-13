import {Injectable} from '@angular/core';
import {createClient} from 'contentful';
import { environment } from '../../../../../environments/environment';
import { of, from } from 'rxjs';
import {map} from 'rxjs/operators';
import * as marked from 'marked';
import {PageModel} from '../../models/content-model';
import {ContentfulAdapter} from './contentful.adapter';



// TODO: hide these tokes before deployment


@Injectable()
export class ContentfulService {

  private cdaClient = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken,
    environment: environment.contentful.environment
  });

  logContent(contentId) {
    this.cdaClient.getEntry(contentId)
      .then(((entry) => console.log('entry', entry)));
  }
  /*getPage(pageId: string) {
    const promise = this.cdaClient.getEntry(pageId);
    return from(new Promise(resolve => resolve(promise)))
      .pipe(map((entry: any) => entry.fields));
  }*/

  getPage(pageId: string): Promise<PageModel> {
    return this.cdaClient.getEntry(pageId, { include: 10 } )
      .then((res: any) => {
        return ContentfulAdapter.parsePage(res);
      });
  }

  markdownToHtml(md: string) {
    return marked(md);
  }
}
