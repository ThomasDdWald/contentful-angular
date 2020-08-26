import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ScrollService {

  private _locked: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public locked: Observable<boolean> = this._locked.asObservable();

  constructor() {
    console.log('ScrollService', Math.random());
  }


  lock() {
    this._locked.next(true);
  }

  unlock() {
    this._locked.next(false);
  }
}
