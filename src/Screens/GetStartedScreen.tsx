import {StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PagerView from 'react-native-pager-view';
import type {ExtendedTheme} from '../types';
import {RootStackParamList} from '../RootNavigator';
import Onboarding1 from '../components/onboarding/Onboarding1';
import Onboarding2 from '../components/onboarding/Onboarding2';
import {save} from '../utils/storage';
import ScrollLayout from '../components/layouts/ScrollLayout';

type GetStartedProps = NativeStackScreenProps<RootStackParamList, 'Start'>;

const GetStartedScreen: React.FC<GetStartedProps> = ({navigation}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const handleGettingStarted = async () => {
    await save('@intro', '1');
    navigation.reset({index: 1, routes: [{name: 'HomeDrawer'}]});
  };
  const pagerViewRef = React.useRef<PagerView>(null);
  const [_currentPage, setCurrentPage] = React.useState(0);

  const handleSetPage = (index: number) => {
    if (pagerViewRef.current) {
      pagerViewRef.current.setPage(index);
    }
  };

  const screens = React.useMemo(() => {
    const steps = [
      {
        component: Onboarding1,
        onNext: handleSetPage,
      },
      {
        component: Onboarding2,
        onNext: handleSetPage,
      },
    ];

    return steps.map((step, index) => ({...step, id: (index + 1).toString()}));
  }, []);

  return (
    <PagerView
      useNext
      style={styles.pagerView}
      ref={pagerViewRef}
      initialPage={0}
      onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
      {screens.map(({id, component: Component, onNext}) => (
        <Component
          key={id}
          onNext={() => onNext(Number(id))}
          handleGettingStarted={handleGettingStarted}
        />
      ))}
    </PagerView>
  );
};

export default GetStartedScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    pagerView: {
      flex: 1,
    },
    buttonText: {
      color: theme.colors.secondary,
    },
    button: {
      backgroundColor: theme.colors.primary,
      width: '80%',
      borderRadius: wp(10),
      color: theme.colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: wp(15),
    },
    skipContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '80%',
    },
    skip: {
      paddingTop: wp(10),
      fontSize: 16,
      color: theme.colors.text,
    },
    onBoardingData: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    onBoardingTextHeader: {
      width: '80%',
      marginTop: wp(10),
      fontSize: 20,
      ...theme.fonts.bold,
      fontWeight: '800',
      color: theme.colors.text,
      textAlign: 'center',
    },
    onBoardingTextFooter: {
      width: '80%',
      marginTop: wp(5),
      fontSize: 14,
      lineHeight: 25,
      color: theme.colors.accent,
      textAlign: 'center',
    },
    onBoardingImage: {
      height: wp(50),
      width: wp(80),
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: wp(20),
    },
    logo: {
      width: wp(60),
      height: wp(60),
      resizeMode: 'contain',
    },
    logoText: {
      width: wp(60),
      resizeMode: 'contain',
    },
  });
