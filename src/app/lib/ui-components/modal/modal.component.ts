import { Component, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../core/services/scroll.service';
import { trigger, state, style, transition, animate, query, animateChild, group } from '@angular/animations';



@Component({
  selector: 'tux-modal',
  exportAs: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        backgroundColor: 'rgba(0, 0, 0, .3)'
      })),
      state('hide', style({
        backgroundColor: 'rgba(0, 0, 0, 0)'
      })),
      transition('hide => show', [
        group([
          query('@showHideContent', animateChild()),
          animate('0.4s'),
        ])
      ]),
      transition('show => hide', [
        group([
          query('@showHideContent', animateChild()),
          animate('0.4s'),
        ])
      ]),
    ]),
    trigger('showHideContent', [
      state('show', style({
        top: '50%',
        opacity: '1'
      })),
      state('hide', style({
        top: '-50%',
        opacity: '0'
      })),
      transition('hide => show', [
        animate('0.4s'),
      ]),
      transition('show => hide', [
        animate('0.4s'),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnDestroy, OnChanges {
  @ViewChild('modalBackground') modalBackground: ElementRef;
  @ViewChild('modalBody') modalBody: ElementRef;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  // Manually open or close the modal window
  @Input() open = false;
  // Set if the modal window have to use the router to open or close
  routingBased = false;
  typeConfirmation = false;
  private previousUrl = '';
  private subscription: Subscription;
  private _show: boolean = false;
  animationStatus = 'hidden';

  @HostListener('document:keyup', ['$event']) onKeyUp(event) {
    if (this.show && (event.key === 'Escape' || event.keyCode === 27)) {
      this.closeModal();
    }
  }

  public get status(): string {
    return this._show ? 'show' : 'hide';
  }

  public get show(): boolean {
    return this._show;
  }

  public set show(value: boolean) {
    // Preventing calling twice when there is no changes
    if (this._show === value) {
      return;
    }
    this.modalBody.nativeElement.scrollTop = 0;
    this._show = value;
  }

  public showHideEvent(event) {
    if (event.phaseName === 'done' && event.toState === 'hide') {
      this.animationStatus = 'hidden';
      this.goPrevious();
      // Sending message that the modal was closed
      this.modalClose.next(null);
      this.scroll.unlock();
      this.typeConfirmation = false;
    }

    if (event.toState === 'show') {
      this.animationStatus = 'shown';

      if (event.phaseName === 'start') {
        this.scroll.lock();
      }
    }
  }

  constructor(private router: Router, private scroll: ScrollService) {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const urlSplit = urlAfterRedirects.split('/');
        console.log('urlSplit', urlSplit);
        let parentUrl = '';

        let routingHasModalOutlet = false;
        for (let i = 0; i < urlSplit.length; i++) {
          const element = urlSplit[i];
          if (element.indexOf('modal:') >= 0) {
            this.setRoutingBasedTrue();
            // If is routing based then it will be shown
            this.show = this.routingBased;
            routingHasModalOutlet = true;
          } else {
            parentUrl += '/' + element;
            console.log('element', element);
          }
        }

        // Storing the parent URL
        // TODO: fix this in a better way
        this.previousUrl = parentUrl;
        console.log('parentUrl', this.previousUrl);

        // If the modal is open, it is routing based but the
        // routing URL doesn't have the modal outlet, then the windows must
        // be closed
        if (this.routingBased && !routingHasModalOutlet && this.show) {
          this.closeModal();
        }
      });
  }

  setRoutingBasedTrue(): void {
    const _body = this.modalBody.nativeElement;
    const _elements = _body.getElementsByTagName('router-outlet');
    this.routingBased = _elements.length > 0;
  }

  closeModal() {
    this.show = false;
  }

  goPrevious() {
    if (this.routingBased) {
      const path: any[] = [this.previousUrl, { outlets: { modal: null } }];
      this.router.navigate(path);
      this.routingBased = false;
    }
  }

  backgroundClick(event) {
    if (this.modalBackground.nativeElement === event.target) {
      this.closeModal();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      this.routingBased = false;
      this.animationStatus = 'hidden';
      this.show = changes.open.currentValue;
    }
  }
}
