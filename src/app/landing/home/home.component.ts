import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ContentfulService} from '../../lib/core/modules/contentful/contentful.service';
import {PageModel} from '../../lib/core/models/content-model';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'tux-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public page: Promise<any>;
  public content: PageModel;
  constructor(
    private contentService: ContentfulService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // dev system cannot access to internet so skip SSR
    if (isPlatformBrowser(this.platformId)) {
      this.contentService.getPage('6GhOjnf1t62TN1whaJPmPp')
        .then( (result: PageModel) => this.content = result);
    }
  }
}

