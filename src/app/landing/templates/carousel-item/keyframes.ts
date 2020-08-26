import { style } from '@angular/animations';

export const slideOutLeft = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(calc(-100% + 40px), 0, 0)', offset: 1 }),
];

export const slideOutRight = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(calc(100% - 40px), 0, 0)', offset: 1 }),
];

export const slideOutLeftLast = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(calc(-100% + 70px), 0, 0)', offset: 1 }),
];

export const slideOutRightLast = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(calc(100% - 70px), 0, 0)', offset: 1 }),
];
