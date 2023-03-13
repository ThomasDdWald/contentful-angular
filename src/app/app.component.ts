import {Component, ElementRef, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {environment} from '../environments/environment';
import {ScrollService} from './lib/core/services/scroll.service';

@Component({
  selector: 'tux-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('scrollingArea') scrollingArea: ElementRef;

  public scrollLocked = false;

  constructor(
    private translate: TranslateService,
    private scroll: ScrollService
  ) {
    translate.setDefaultLang('en');
    translate.use(environment.language);
    this.scroll.locked.subscribe(isLocked => this.onScrollLockChange(isLocked));
  }

  onScrollLockChange(isLocked) {
    console.log('onScrollLockChange', isLocked);
    if (this.scrollLocked === isLocked) {
      return;
    }
    const scrollingArea = this.scrollingArea.nativeElement;
    if (isLocked) {
      scrollingArea.style.overflow = 'hidden';

      const scrollTop = scrollingArea.scrollTop;
      requestAnimationFrame(() => {
        console.log('scrollTop', scrollTop);
        scrollingArea.scrollTop = 0;
        scrollingArea.style.top = (0 - scrollTop) + 'px';
        scrollingArea.style.overflow = 'hidden';
      });
    } else {
      scrollingArea.style.overflow = 'auto';

      /*requestAnimationFrame(() => {
        const top = parseInt(scrollingArea.style.top, 10);
        console.log('top', top);
        scrollingArea.style.overflow = 'auto';
        scrollingArea.scrollTop = 0 - top;
        scrollingArea.style.top = 0;
      });*/
    }
    this.scrollLocked = isLocked;
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

}
