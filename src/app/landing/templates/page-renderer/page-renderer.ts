import {Component, ViewContainerRef, Input, ComponentFactoryResolver, OnChanges, Type} from '@angular/core';
import { ContentBlock, BlockComponent } from './content-block';

import { PageModel, BlockModel, BlockType } from '../../../lib/core/models/content-model';
import {HeaderComponent} from '../header/header.component';
import {BlockStageComponent} from '../stage/stage.component';
import {BlockSignupComponent} from '../signup/signup.component';
import {BlockBenefitsComponent} from '../benefits/benefits.component';




@Component({
  selector: 'tux-page-renderer',
  template: ''
})

export class PageRendererComponent implements OnChanges {
  @Input() content: PageModel;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  private getBlockComponent(type: BlockType): Type<BlockComponent> {
    switch (type) {
      case BlockType.HEADER:
        return HeaderComponent;
      case BlockType.STAGE:
        return BlockStageComponent;
      case BlockType.SIGNUP:
        return BlockSignupComponent;
      case BlockType.BENEFITS:
        return BlockBenefitsComponent;
      /*case BlockType.PRODUCT_CONFIGURATOR:
        return AlvBlockProductConfiguratorComponent;
      case BlockType.INVESTMENT_TYPE:
        return AlvBlockInvestmentTypeComponent;
      case BlockType.INVESTMENT_PLANNER:
        return AlvBlockInvestmentPlannerComponent;
      case BlockType.FAQ:
        return AlvFaqBlockComponent;*/
      }
  }

  private createBlock(model: BlockModel): ContentBlock {
    return new ContentBlock(this.getBlockComponent(model.type), model.content);
  }

  private renderBlock(model: BlockModel) {
    const block = this.createBlock(model);
    if (block) {
      // console.log('rendering', model);
      const factory = this.componentFactoryResolver.resolveComponentFactory(block.component);
      const componentRef = this.viewContainerRef.createComponent(factory);
      // console.log('create', model.type, model);
      (<ContentBlock>componentRef.instance).content = model.content;
    }
  }

  private renderContent() {
    // console.log('renderContent', this.content);
    if (this.content) {
      this.content.blocks.map(block => this.renderBlock(block));
    }
  }

  ngOnChanges() {
    this.renderContent();
  }
}
