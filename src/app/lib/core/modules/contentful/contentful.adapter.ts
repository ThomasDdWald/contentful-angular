import {
  BlockModel,
  BlockType,
  PageModel,
  PictureContentModel,
  CtaContentModel,
  StageContentModel,
  BenefitsContentModel,
  HeaderContentModel,
  InvestmentPlannerContentModel,
  TooltipContentModel,
  InformationBoxContentModel,
  ProductConfiguratorContentModel,
  InvestmentTypeContentModel,
  QuestionAndAnswersContentModel,
  FaqContentModel, SignupContentModel
} from '../../models/content-model';

export class ContentfulAdapter {

  private static getBlockParser(type: BlockType) {
    switch (type) {
      case BlockType.SIGNUP:
        return ContentfulAdapter.parseSignUp;
      case BlockType.STAGE:
        return ContentfulAdapter.parseStage;
      case BlockType.BENEFITS:
        return ContentfulAdapter.parseBenefits;
      case BlockType.HEADER:
        return ContentfulAdapter.parseHeader;
      case BlockType.INVESTMENT_PLANNER:
        return ContentfulAdapter.parseInvestmentPlaner;
      case BlockType.PRODUCT_CONFIGURATOR:
        return ContentfulAdapter.parseProductConfigurator;
      case BlockType.INVESTMENT_TYPE:
        return ContentfulAdapter.parseInvestmentType;
      case BlockType.FAQ:
        return ContentfulAdapter.parseFaq;
      default:
        return (fields: any) => { };
    }
  }

  // TODO: use a mapping object rather than a switch statement
  private static parseBlocks(blocks: any): Array<BlockModel> {
    console.log('parseBlocks', blocks);
    const blocksContent = [];
    blocks.map(block => {
      if (block.fields) {
        const type = block.sys.contentType.sys.id;
        const parser = ContentfulAdapter.getBlockParser(type);
        blocksContent.push({
          type: type,
          content: parser(block.fields)
        });
      }
    });

    console.log('return', blocksContent);
    return blocksContent;

  }

  private static parseFaq(fields: any): FaqContentModel {
    return {
      header: fields.header,
      questionsAndAnswers: ContentfulAdapter.parseQuestionsAndAnswers(fields.questionsAndAnswers)
    };
  }

  private static parseQuestionsAndAnswers(fields: any): QuestionAndAnswersContentModel {
    // console.log('parseQuestionsAndAnswers', fields.map(res => res.fields.answer));
    if (fields !== undefined) {
      const content = fields.map(value => {
        return {
          questions: value.fields.question,
          answers: ContentfulAdapter.parseBody(value.fields.answer)
        };
      });
      return content;
    } else {
      return null;
    }
  }

  private static parseProductConfigurator(fields: any): ProductConfiguratorContentModel {
    // console.log('ProductConfigurator', fields);
    const model = {
      step: fields.step,
      header: fields.header,
      title: fields.title,
      body: ContentfulAdapter.parseBody(fields.body),
      textPosition: fields.textPosition,
      goodValueTooltip: ContentfulAdapter.parseTooltip(fields.goodValueTooltip),
      mediumValueLabel: fields.mediumValueLabel,
      mediumValueTooltip: ContentfulAdapter.parseTooltip(fields.mediumValueTooltip),
      capitalGuranteeLabel: fields.capitalGuaranteeLabel,
      capitalGuranteeTooltip: ContentfulAdapter.parseTooltip(fields.capitalGuranteeTooltip),
      informationBoxes: ContentfulAdapter.parseInformationBoxes(fields.informationBox)
    };
    if (fields.cta) {
      model['cta'] = ContentfulAdapter.ctaParse(fields.cta.fields);
    }
    if (fields.body2) {
      model['body2'] = ContentfulAdapter.parseBody(fields.body2);
    }
    return model;
  }

  private static parseInvestmentType(fields: any): InvestmentTypeContentModel {
    // console.log('InvestmentType', fields);
    return {
      title: ContentfulAdapter.parseBody(fields.title, false),
      passiveHeader: fields.passiveHeader,
      passiveDescription: ContentfulAdapter.parseBody(fields.activeDescription),
      activeHeader: fields.activeHeader,
      activeDescription: ContentfulAdapter.parseBody(fields.activeDescription),
      defaultSelection: fields.defaultSelection
    };
  }

  private static parseInvestmentPlaner(fields: any): InvestmentPlannerContentModel {
    // console.log('parseInventmentPlaner', fields);
    return {
      title: fields.title,
      cta: ContentfulAdapter.ctaParse(fields.cta.fields),
      goodValueLabel: fields.goodValueLabel,
      goodValueTooltip: ContentfulAdapter.parseTooltip(fields.goodValueTooltip),
      mediumValueLabel: fields.mediumValueLabel,
      mediumValueTooltip: ContentfulAdapter.parseTooltip(fields.mediumValueTooltip),
      capitalGuaranteeLabel: fields.capitalGuaranteeLabel,
      capitalGuaranteeTooltip: ContentfulAdapter.parseTooltip(fields.capitalGuaranteeTooltip),
      informationBoxes: ContentfulAdapter.parseInformationBoxes(fields.informationBox),
      defaultInitialPayment: fields.defaultInitialPayment,
      defaultMonthlyPayment: fields.defaultMonthlyPayment,
      defaultInvestmentTerm: fields.defaultInvestmentTerm,
      defaultGuaranteeRate: fields.defaultGuaranteeRate
    };
  }

  private static parseTooltip(content: any): TooltipContentModel {
    // console.log('parseToolTip', content);
    if (content !== undefined) {
      return {
        icon: content.fields.icon,
        body: ContentfulAdapter.parseBody(content.fields.body, false)
      };
    } else {
      return null;
    }
  }
  private static parseInformationBoxes(fields: any): Array<InformationBoxContentModel> {
    // console.log('parseInofmrationBox', fields);
    if (fields !== undefined) {
      const content = fields.map(value => {
        return {
          title: value.fields.title,
          description: value.fields.description,
          cta: ContentfulAdapter.ctaParse(value.fields.cta.fields)
        };
      });
      return content;
    } else {
      return null;
    }
  }


  private static parseBenefits(fields: any): BenefitsContentModel {
    const parseBenefits = fields.content.fields;
    console.log('parseBenefits', parseBenefits.benefit1body);

    return  {
        header: parseBenefits.header,
        benefit1Title: parseBenefits.benefit1title,
        benefit1Body: ContentfulAdapter.parseBody(parseBenefits.benefit1body),
        benefit2Title: parseBenefits.benefit2title,
        benefit2Body: ContentfulAdapter.parseBody(parseBenefits.benefit2body),
        benefit3Title: parseBenefits.benefit3title,
        benefit3Body: ContentfulAdapter.parseBody(parseBenefits.benefit3body)
    };
  }

  static parseHeader(fields: any): HeaderContentModel {
    return {
      title: fields.content.fields.title
    };
  }
  private static parseSignUp(fields) {
   const parseContent = fields.content.fields;
   // console.log('parseSignUp', parseContent);
    return {
      titleLine1: parseContent.titleLine1,
      titleLine2: parseContent.titleLine2,
      cta: ContentfulAdapter.ctaParse(parseContent.cta)
    } as SignupContentModel;
  }

  private static parseBody(body, addParagraphTag = true): string {
    console.log('parseBody', body);

    let bodyContent = '';
    body.content.map(content => {
      // console.log('contentType', content);
      switch (content.nodeType) {
        case 'paragraph':
          bodyContent += ContentfulAdapter.parseBodyParagraph(content, addParagraphTag);
          break;
        case 'unordered-list':
          bodyContent += ContentfulAdapter.parseUnorderedList(content);
          break;
      }
    });
    return bodyContent;
  }
  private static parseHyperLink(content) {

  }



  private static parseBodyParagraph(content, addParagraphTag) {
    // console.log('parseBodyParagraph', content.content[1].content[1]);
    let paragraphContent = '';
    content.content.map(value => {
      if (value.nodeType && value.content ) {
        return paragraphContent += '<a class="faqcontent" href="' + value.data.uri + '">' + value.content[0].value + '</a>';
      }
      if (Array.isArray(value.marks)) {
        if (value.marks[0]) {
          switch (value.marks[0].type) {
            case 'bold':
              paragraphContent += '<strong>' + value.value + '</strong>';
              break;
            default:
              paragraphContent += value.value;
          }
        } else {
          paragraphContent += value.value;
        }
      } else {
        if (value.marks) {
          switch (value.marks.type) {
            case 'bold':
              paragraphContent += '<strong>' + value.value + '</strong>';
              break;
            default:
              paragraphContent += value.value;
          }
        } else {
          paragraphContent += value.value;
        }
      }

    });

    if (addParagraphTag && paragraphContent !== '') {
      return '<p>' + paragraphContent + '</p>';
    }
    return paragraphContent;
  }

  private static parseUnorderedList(content) {
    let listContent = '<ul>';
    // console.log('parseUnorderedList', content.content);
    content.content.map(value => {
      value.content.map(res => {
        res.content.map(result => {
          listContent += '<li>' + result.value + '</li>';
        });
      });
    });
    listContent += '</ul>';
    return listContent;
  }

  private static parsePicture(picture): PictureContentModel {
    // console.log('parsePicture', picture );
    return {
      title: picture.title,
      url: picture.file.url,
    };
  }

  private static parseStage(fields: any): StageContentModel {
    fields = fields.content.fields;
      return {
        titleLine1: fields.titleLine1,
        titleLine2: fields.titleLine2,
        picture: ContentfulAdapter.parsePicture(fields.picture.fields),
        body: ContentfulAdapter.parseBody(fields.body),
        cta: ContentfulAdapter.ctaParse(fields.cta.fields)
      };
  }
  private static ctaParse(fields): CtaContentModel {
     console.log('fields', fields);
    return {
      text: fields.text,
      url: fields.url,
      isExternal: fields.isExternal,
      opensNewPage: fields.opensNewPage,
      style: fields.style,
      isModal: fields.isModal
    };
  }
  private static formatCtaStyle(style: string): string {
    if (style) {
      return style.toLowerCase().replace(' ', '-');
    }
    return null;
  }



  public static parsePage( content ): PageModel {
    // console.log('parsePage', content);
    return {
      title: '',
      slug: '',
      blocks: ContentfulAdapter.parseBlocks(content.fields.blocks)
    };
  }
}
