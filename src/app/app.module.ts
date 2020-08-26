import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MdToHtmlPipe} from './lib/pipes/md-to-html.pipe';
import {ContentfulService} from './lib/core/modules/contentful/contentful.service';
import {ModalModule} from './lib/ui-components/modal/modal.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {PruningTranslationLoader} from './pruning-translation-loader';
import localeDe from '@angular/common/locales/de';
import {ScrollService} from './lib/core/services/scroll.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(localeDe, 'de');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new PruningTranslationLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MdToHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ModalModule,
  ],
  providers: [ContentfulService, ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
