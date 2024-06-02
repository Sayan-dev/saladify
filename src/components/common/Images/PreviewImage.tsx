import React from 'react';
import {Image, ImageStyle, StyleProp, View} from 'react-native';
import PNG from '../../../assets/images/previewimage.png';

type Props = {
  width?: number;
  height?: number;
  url?: string;
  style: StyleProp<ImageStyle>;
};

const Preview = ({width = 24, height = 24, url, style}: Props) => {
  return url ? (
    <Image style={style} source={{uri: url}} />
  ) : (
    <Image style={{width, height}} source={PNG} />
  );
};

export default Preview;
