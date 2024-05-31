import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import type {ExtendedTheme} from '../../types';
import fonts, {FontStyles} from '../../theme/fonts';

type Child = string | number | React.ReactElement | null | undefined;

export interface TypographyProps extends TextProps {
  children?: Child | Child[];
  fontStyle?: keyof FontStyles;
  fontSize?: number | keyof ExtendedTheme['fontSize'];
  align?: 'left' | 'center' | 'right' | 'auto' | 'justify';
  color?: keyof ExtendedTheme['colors'];
  mb?: number;
  mt?: number;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  fontStyle = 'regular',
  fontSize = 'text',
  align,
  color,
  mb,
  mt,
  ...props
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Text
      {...props}
      style={[
        styles.text,
        {color: color ? theme.colors[color] : theme.colors.text},
        {
          fontSize:
            typeof fontSize === 'number' ? fontSize : theme.fontSize[fontSize],
        },
        fonts[fontStyle],
        align ? {textAlign: align} : null,
        mb ? {marginBottom: mb} : null,
        mt ? {marginTop: mt} : null,
        style,
      ]}>
      {children}
    </Text>
  );
};

export default Typography;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
      ...theme.fonts.regular,
    },
  });
