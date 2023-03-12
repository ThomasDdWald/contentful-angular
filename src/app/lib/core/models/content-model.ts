export enum BlockType {
  HEADER = 'blockHeader',
  STAGE = 'blockStage',
  SIGNUP = 'signUp',
  BENEFITS = 'blockBenefits',
  PRODUCT_CONFIGURATOR = 'blockProductConfigurator',
  INVESTMENT_PLANNER = 'blockInvestmentPlanner',
  INVESTMENT_TYPE = 'blockInvestmentType',
  FAQ = 'blockFaq'
}

export enum ConfigurationType {
  INVESTMENT = 'Investment',
  TERM = 'Term',
  GUARANTEE = 'Capital guarantee'
}

export enum TextPosition {
  LEFT = 'Left',
  RIGHT = 'Right'
}

export enum InvestmentType {
  ACTIVE = 'Active',
  PASSIVE = 'Passive'
}

export enum CtaStyle {
  GOLD = 'Gold'
}

export enum IconType {
  INFO = 'Info'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BlockContentModel { }

export interface PictureContentModel {
  title: string;
  url: string;
}

export interface BlockModel {
  type: BlockType;
  content: BlockContentModel;
}

export interface PageModel {
  title: string;
  slug?: string;
  blocks: Array<BlockModel>;
}

export interface CtaContentModel extends BlockContentModel {
  text: string;
  url: string;
  isExternal: boolean;
  opensNewPage: boolean;
  style?: string;
  isModal: boolean;
}

export interface StageContentModel extends BlockContentModel {
  titleLine1: string;
  titleLine2: string;
  picture: PictureContentModel;
  body: string;
  cta: CtaContentModel;
}

export interface SignupContentModel extends BlockContentModel {
  titleLine1: string;
  titleLine2: string;
  cta: CtaContentModel;
}

export interface BenefitsContentModel extends BlockContentModel {
  header: string;
  benefit1Title: string;
  benefit1Body: string;
  benefit2Title: string;
  benefit2Body: string;
  benefit3Title: string;
  benefit3Body: string;
}

export interface HeaderContentModel extends BlockContentModel {
  title: string;
}

// Not used at the moment. Should it be removed?
export interface TooltipContentModel extends BlockContentModel {
  icon: IconType;
  body: string;
}

export interface InformationBoxContentModel extends BlockContentModel {
  title: string;
  description: string;
  cta?: CtaContentModel;
}

export interface InvestmentPlannerContentModel extends BlockContentModel {
  title: string;
  cta: CtaContentModel;
  goodValueLabel: string;
  goodValueTooltip: TooltipContentModel;
  mediumValueLabel: string;
  mediumValueTooltip: TooltipContentModel;
  capitalGuaranteeLabel: string;
  capitalGuaranteeTooltip: TooltipContentModel;
  informationBoxes: Array<InformationBoxContentModel>;
  defaultInitialPayment: number;
  defaultMonthlyPayment: number;
  defaultInvestmentTerm: number;
  defaultGuaranteeRate: number;
}

export interface ProductConfiguratorContentModel extends BlockContentModel {
  step: ConfigurationType;
  header: string;
  title: string;
  body: string;
  body2?: string;
  cta?: CtaContentModel;
  textPosition: TextPosition;
  goodValueTooltip?: TooltipContentModel;
  mediumValueLabel?: string;
  mediumValueTooltip?: TooltipContentModel;
  capitalGuranteeLabel?: string;
  capitalGuranteeTooltip?: TooltipContentModel;
  informationBox?: InformationBoxContentModel;
}

export interface InvestmentTypeContentModel extends BlockContentModel {
  title: string;
  passiveHeader: string;
  passiveDescription: string;
  activeHeader: string;
  activeDescription: string;
  defaultSelection: InvestmentType;
}

export interface QuestionAndAnswersContentModel extends BlockContentModel {
  questions: string;
  answers: string;
}

export interface FaqContentModel extends BlockContentModel {
  header: string;
  questionsAndAnswers: QuestionAndAnswersContentModel;
}

