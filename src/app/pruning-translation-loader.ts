import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

export class PruningTranslationLoader implements TranslateLoader {

  constructor(
    private http: HttpClient,
    private prefix: string = '/assets/i18n/',
    private suffix: string = '.json') {
  }

  public getTranslation(lang: string): Observable<any> {
    // When the language is "en", we already know that the json file is not there, so it sends
    // an empty object and prevents the HTTP request failure
    if (lang === 'en') {
      return from(Promise.resolve({}));
    }

    return this.http.get(`${this.prefix}${lang}${this.suffix}`)
      .pipe(
        // When the request is successful, it sends the json object to the translation service
        map((result: object) => this.process(result)),
        // If there is some error on the request (i.e. "en" language), it sends an empty object to
        // the translation service and then the translate directive will use the default text
        catchError((error: HttpErrorResponse) => Promise.resolve({}))
      );
  }

  private process(object: object) {
    return Object.keys(object)
      .filter(key => object.hasOwnProperty(key) && object[key] !== '')
      .reduce((result, key) => (result[key] = typeof object[key] === 'object' ? this.process(object[key]) : object[key], result), {});
  }

}
