import {getScaleValueFromWidthPer} from './dimensions';

export const fontSize = {
  tiny: getScaleValueFromWidthPer('2%'),
  smaller: getScaleValueFromWidthPer('3%'),
  small: getScaleValueFromWidthPer('4%'),
  medium: getScaleValueFromWidthPer('5%'),
  mediumPlus: getScaleValueFromWidthPer('6%'),
  large: getScaleValueFromWidthPer('7%'),
  huge: getScaleValueFromWidthPer('8%'),
  massive: getScaleValueFromWidthPer('11%'),
};

export const lineHeight = {
  tiny: getScaleValueFromWidthPer('2.5%'),
  smaller: getScaleValueFromWidthPer('3.5%'),
  small: getScaleValueFromWidthPer('4.5%'),
  medium: getScaleValueFromWidthPer('5.5%'),
  mediumPlus: getScaleValueFromWidthPer('6.5%'),
  large: getScaleValueFromWidthPer('7.5%'),
  huge: getScaleValueFromWidthPer('8.5%'),
  massive: getScaleValueFromWidthPer('11.5%'),
};
