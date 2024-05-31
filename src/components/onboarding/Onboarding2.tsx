import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../common/Button';
import OnBoarding2 from '../../assets/images/onboarding2.png';
import type {ExtendedTheme} from '../../types';
import FruitBasketsvg from '../common/Images/FruitBasket';

interface onboardProps {
  handleGettingStarted?: () => void;

  key: string;
}

const Onboarding1 = ({handleGettingStarted}: onboardProps) => {
  const theme = useTheme();

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <FruitBasketsvg />
      </View>
      <View style={styles.info}>
        <View style={styles.onBoardingData}>
          <Text style={styles.onBoardingTextHeader}>
            Get The Freshest Fruit Salad Combo
          </Text>
          <Text style={styles.onBoardingTextFooter}>
            We deliver the best and freshest fruit salad in town. Order for a
            combo today!!!
          </Text>
        </View>
        <View style={styles.actionArea}>
          <Button
            style={styles.getStartedButton}
            onPress={handleGettingStarted}>
            Let's Continue
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
      alignItems: 'flex-start',
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
    getStartedButton: {
      width: '100%',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      borderRadius: 10,
    },
    nextButton: {
      paddingVertical: theme.spacing.md,
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
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    onBoardingTextHeader: {
      fontSize: 20,
      ...theme.fonts.medium,
      color: theme.colors.text,
    },
    onBoardingTextFooter: {
      marginTop: wp(5),
      paddingRight: wp(5),

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
