import React from 'react';
import {Image, View} from 'react-native';
import PNG from '../../../assets/images/previewimage.png';

type Props = {
  width?: number;
  height?: number;
};

const Preview = ({width, height}: Props) => (
  <Image style={{width, height}} source={PNG} />
);

export default Preview;
