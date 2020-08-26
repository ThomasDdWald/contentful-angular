import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive, ElementRef,
  HostBinding, OnInit,
  QueryList, TemplateRef, ViewChild,
} from '@angular/core';
import {animate, keyframes, transition, trigger} from '@angular/animations';
import * as kf from './keyframes';
import Hammer from '@egjs/hammerjs';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';


export enum slideState {
  ACTIVE,
  NEXT,
  EXITING,
  DEFAULT,
  ACTIVELAST,
  EXITINGLAST,
}

@Directive({
  selector: 'tux-carousel-item'
})
export class CarouselItemDirective {
  @HostBinding('class') get stateClass() {
    switch (this.state) {
      case slideState.ACTIVE: {
        return 'is-active ';
      }
      case slideState.NEXT: {
        return 'is-next ';
      }
      case slideState.EXITING: {
        return 'is-exiting';
      }
      case slideState.DEFAULT: {
        return 'is-default';
      }
      case slideState.ACTIVELAST: {
        return 'is-active-last';
      }
      case slideState.EXITINGLAST: {
        return 'is-exiting-last';
      }
    }
  }

  public state: slideState;
}

@Component({
  selector: 'tux-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(200, keyframes(kf.slideOutLeft))),
      transition('* => slideOutLeftLast', animate(200, keyframes(kf.slideOutLeftLast))),
      transition('* => slideOutRight', animate(200, keyframes(kf.slideOutRight))),
      transition('* => slideOutRightLast', animate(200, keyframes(kf.slideOutRightLast)))
    ])
  ]
})

export class CarouselComponent implements AfterContentInit, OnInit {
  @ContentChildren(CarouselItemDirective) public carouselItems: QueryList<CarouselItemDirective>;
  animationState = '';
  index = 0;
  carouselDisabled = false;
  dots: any;

  @ViewChild('carInner', { static: true }) carInner;


  constructor(public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 704px)'])
      .subscribe((state: BreakpointState) => {
        this.carouselDisabled = state.matches;
      });
  }

  ngAfterContentInit() {
    setTimeout(() => this.initCarousel());
    const manager = new Hammer.Manager(this.carInner.nativeElement);
    const Swipe = new Hammer.Swipe( { 'direction': Hammer.DIRECTION_HORIZONTAL } );
    manager.add(Swipe);

    manager.on('swipe', (e) => {
      e.deltaX < 0 && !this.carouselDisabled ? this.startAnimation(true) : this.startAnimation(false);
    });
  }

  initCarousel() {
    this.dots = Array(this.carouselItems.length);
    this.carouselItems.toArray()[0].state = slideState.ACTIVE;
    this.carouselItems.toArray()[1].state = slideState.NEXT;
  }

  startAnimation(state: boolean) {
    if (state && this.index !== this.carouselItems.length - 1) {
      this.animationState = this.index === this.carouselItems.length - 2 ? 'slideOutLeftLast' : 'slideOutLeft';
      this.index += 1;
    }
    if (!state && this.index !== 0) {
      this.animationState = this.index === this.carouselItems.length - 1 ? 'slideOutRightLast' : 'slideOutRight';
      this.index -= 1;
    }
  }

  resetAnimationState() {
    if (this.animationState !== 'slideOutLeftLast') {
      this.carouselItems.toArray()[this.index].state = slideState.ACTIVE;
      this.carouselItems.toArray()[this.index + 1].state = slideState.NEXT;
      if (this.index !== 0) {
        this.carouselItems.toArray()[this.index - 1].state = slideState.EXITING;
      }
    } else {
      this.carouselItems.toArray()[this.index].state = slideState.ACTIVELAST;
      this.carouselItems.toArray()[this.index - 1].state = slideState.EXITINGLAST;
    }

    this.carouselItems.forEach((item, index) => {
      if (index < this.index - 1 || index > this.index + 1) {
        item.state = slideState.DEFAULT;
      }
    });
  }


}
