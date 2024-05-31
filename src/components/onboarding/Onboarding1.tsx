import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../common/Button';

import type {ExtendedTheme} from '../../types';
import FruitBasketsvg from '../common/Images/FruitBasket';

interface onboardProps {
  onNext?: () => void;
  handleGettingStarted?: () => void;

  key: string;
}

const Onboarding1 = ({onNext, handleGettingStarted}: onboardProps) => {
  const theme = useTheme();

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {/* <Image resizeMode="contain" style={styles.onBoardingImage} source={OnBoarding1} /> */}
      <View style={styles.banner}>
        <FruitBasketsvg />
      </View>
      <View style={styles.info}>
        <View style={styles.onBoardingData}>
          <Text style={styles.onBoardingTextHeader}>Welcome to Ketchup</Text>
          <Text style={styles.onBoardingTextFooter}>
            Generate a new recipe from what you have at home
          </Text>
        </View>

        <View style={styles.actionArea}>
          <Text
            onAccessibilityAction={handleGettingStarted}
            style={styles.skip}>
            Skip
          </Text>

          <Button
            iconSize={40}
            RightIconName="keyboard-arrow-right"
            style={styles.nextButton}
            onPress={onNext}>
            Next
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Onboarding1;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    pagerView: {
      flex: 1,
    },
    banner: {
      flex: 1,
      flexDirection: 'column-reverse',
      alignItems: 'center',

      backgroundColor: theme.colors.primary,
      height: heightPercentageToDP(50),
      paddingBottom: heightPercentageToDP(5),
    },
    info: {
      height: heightPercentageToDP(40),
      paddingHorizontal: wp(5),
      justifyContent: 'space-evenly',
    },
    buttonText: {
      color: theme.colors.secondary,
    },
    skipButton: {
      backgroundColor: theme.colors.background,
    },
    nextButton: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: 40,
    },
    actionArea: {
      borderTopWidth: 0.5,
      paddingVertical: wp(10),
      borderColor: theme.colors.lightBackground,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    skip: {
      fontSize: 16,
      color: theme.colors.text,
    },
    onBoardingData: {
      marginTop: wp(5),
      display: 'flex',
      flexDirection: 'column',
    },
    onBoardingTextHeader: {
      fontSize: 20,
      ...theme.fonts.bold,
      color: theme.colors.text,
    },
    onBoardingTextFooter: {
      marginTop: wp(5),
      fontSize: 16,
      lineHeight: 25,
      color: theme.colors.accent,
    },
    onBoardingImage: {
      height: wp(70),
      width: wp(100),
    },
    container: {
      flexGrow: 1,
    },
  });
