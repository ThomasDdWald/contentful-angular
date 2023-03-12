import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import {PageRendererComponent} from './templates/page-renderer/page-renderer';
import {TranslateModule} from '@ngx-translate/core';
import {BlockStageComponent} from './templates/stage/stage.component';
import {CtaComponent} from './templates/cta/cta.component';
import {BlockSignupComponent} from './templates/signup/signup.component';
import {BlockBenefitsComponent} from './templates/benefits/benefits.component';
import {CarouselModule} from './templates/carousel-item/carousel.module';
import {Nl2BrPipe} from '../lib/pipes/nl2br.pipe';
import {BlockHeaderStageComponent} from './templates/header-stage/header-stage';

@NgModule({
    declarations: [
        HomeComponent,
        FooterComponent,
        HeaderComponent,
        BlockHeaderStageComponent,
        BlockStageComponent,
        PageRendererComponent,
        CtaComponent,
        BlockSignupComponent,
        BlockBenefitsComponent,
        Nl2BrPipe
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        TranslateModule,
        CarouselModule,
    ],
    bootstrap: [HomeComponent]
})
export class LandingModule { }
