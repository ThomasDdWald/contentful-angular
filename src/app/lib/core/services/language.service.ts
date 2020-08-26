import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LanguageService {

  private _current: BehaviorSubject<string> = new BehaviorSubject('');
  public current: Observable<string> = this._current.asObservable();

  constructor(private translate: TranslateService) {
    this.use(environment.language);
  }

  use(language: string) {
    this.translate.use(language);
    this._current.next(language);
  }
}
