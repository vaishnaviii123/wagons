import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base design size (iPhone 11 / standard)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const fontScale = size => PixelRatio.roundToNearestPixel(scale(size));
