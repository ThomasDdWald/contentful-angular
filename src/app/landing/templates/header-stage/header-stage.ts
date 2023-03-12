import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'tux-header-stage',
  templateUrl: './header-stage.html',
  styleUrls: ['./header-stage.scss'],
  /* animations: [
    trigger('toggle', [
      state(
        'hidden',
        style({opacity: 1, transform: 'translateY(-100%)'})
      ),
      state(
        'visible',
        style({opacity: 1, transform: 'translateY(0)'})
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]*/
})



export class BlockHeaderStageComponent implements AfterViewInit, OnDestroy {
  private scroll$: Subscription;
  scrollDirection$: Subscription;

  menuOpen = false;
  isVisible = true;
  solidBackground = false;
  @HostBinding('@toggle') get toggle(): string {
    return this.isVisible ? 'visible' : 'hidden';
  }
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

  constructor(
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private eRef: ElementRef
  ) { }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const scrollingElemet = this.document.querySelector('.main-page');
      const bodyElement = this.document.querySelector('body');

      const scrollEvent =
        fromEvent(scrollingElemet, 'scroll').pipe(
          throttleTime(50),
          map(() => scrollingElemet.scrollTop)
        );

      console.log(scrollingElemet.scrollHeight);
      this.scrollDirection$ = scrollEvent.pipe(
        filter(value => value > 0 && value < scrollingElemet.scrollHeight - bodyElement.scrollHeight),
        pairwise(),
        map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        distinctUntilChanged(),
        share()
      ).subscribe(direction => {
        this.isVisible = direction === Direction.Up;
      });

      this.scroll$ = scrollEvent.subscribe(val => {
        this.solidBackground = val > 50;
        this.menuOpen = false;
      });
    }
  }

  /*goToInvestmentPlanner() {
    const scrollingElemet = this.document.querySelector('.main-page');
    this.isVisible = false;
    scrollingElemet.scrollTo({ left: 0, top: 3500, behavior: 'smooth' });
  }*/

  ngOnDestroy() {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
    if (this.scrollDirection$) {
      this.scrollDirection$.unsubscribe();
    }
  }
}
