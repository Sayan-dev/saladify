/* eslint-disable prettier/prettier */
import { Modal, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import RNModal from 'react-native-modal';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import type { ExtendedTheme } from '../../../types';
import Typography from '../Typography';

interface Props {
  open: boolean;
  loadingText: string;
}

const initialOffset = 50;
const duration = 800;

const Loading = ({ open, loadingText }: Props) => {
  const theme = useTheme();
  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(-initialOffset, { duration, easing: Easing.cubic }),
        withTiming(initialOffset, { duration, easing: Easing.cubic }),
      ),
      -1,
      true,
    );
  }, []);

  // const iconStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: withSpring(100) }],
  // }));
  const styles = createStyles(theme);
  return (
    <RNModal isVisible={open} style={styles.container}>
      <View style={styles.loader}>
        <Animated.View style={[animatedStyles, styles.loading]} />
        <Typography style={styles.loadingText}>{loadingText}</Typography>
      </View>
    </RNModal>
  );
};

export default Loading;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loader: {
      backgroundColor: theme.colors.background,
      width: widthPercentageToDP(80),
      height: heightPercentageToDP(40),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
    },
    loading: {
      width: 50,
      height: 50,
      marginBottom: 60,
      backgroundColor: theme.colors.primary,
    },
    loadingText: {
      textAlign: 'center',
    },
  });
