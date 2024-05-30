import type {TextStyle} from 'react-native';

export interface FontStyles {
  regular: TextStyle;
  medium: TextStyle;
  semibold: TextStyle;
  bold: TextStyle;
}

const fonts: FontStyles = {
  regular: {
    fontFamily: 'Brandon_reg',
  },
  medium: {
    fontFamily: 'Brandon_med',
  },
  semibold: {
    fontFamily: 'Brandon_blk',
  },
  bold: {
    fontFamily: 'Brandon_bld',
  },
};

export default fonts;
