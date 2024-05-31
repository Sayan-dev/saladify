import * as React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {transform} from 'lodash';
import type {ExtendedTheme, FontSize} from '../../types';
import Typography from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  children?: string | React.ReactElement;
  isLoading?: boolean;
  LeftIconName?: string;
  RightIconName?: string;
  iconSize?: number;
  fontSize?: keyof FontSize;
  backgroundColor?: keyof ExtendedTheme['colors'];
  textColor?: keyof ExtendedTheme['colors'];
  borderWidth?: number;
  borderRadius?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  isLoading = false,
  LeftIconName,
  RightIconName,
  borderRadius = 10,
  iconSize = 28,
  fontSize = 'medium',
  backgroundColor,
  borderWidth,
  textColor,
  ...props
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const isPressed = useSharedValue(0);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(10 * isPressed.value)}],
  }));

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? theme.colors[backgroundColor]
            : theme.colors.primary,
          borderColor: theme.colors.primary,
          borderWidth,
          borderRadius,
        },

        style,
      ]}
      onPressIn={() => {
        isPressed.value = 1;
      }}
      onPressOut={() => {
        isPressed.value = 0;
      }}
      disabled={isLoading}>
      {LeftIconName && (
        <Icon
          style={styles.leftIcon}
          color={theme.colors.text}
          name={LeftIconName}
          size={iconSize}
        />
      )}
      <Typography
        style={[
          styles.text,
          {
            color: textColor
              ? theme.colors[textColor]
              : theme.colors.background,
          },
        ]}
        fontSize={fontSize}
        fontStyle="medium">
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.background,
    },
    rightIcon: {
      position: 'absolute',
      right: 5,
    },
    leftIcon: {
      position: 'absolute',
      left: -5,
    },
    loader: {
      marginLeft: theme.spacing.sm,
    },
  });
