import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {RootStackParamList} from '../RootNavigator';
import ScrollLayout from '../components/layouts/ScrollLayout';
import type {ExtendedTheme} from '../types';
import Logo from '../assets/images/logo.png';
import useInitializeFirebase from '../hooks/useInitializeFirebase';
import {get} from '../utils/storage';
import {useGetUser} from '../api/queries/auth.queries';
import {useUser} from '../store/selector';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const [user, initializing] = useInitializeFirebase();
  const [, updateUser] = useUser();
  const dbUser = useGetUser();

  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const bootstrap = async () => {
    if (!initializing) {
      const introFlag = await get('@intro');

      if (!introFlag) navigation.reset({index: 1, routes: [{name: 'Start'}]});
      else if (!user) {
        navigation.reset({index: 1, routes: [{name: 'Login'}]});
      } else {
        updateUser(dbUser.data?.user || null);
        navigation.reset({index: 1, routes: [{name: 'HomeDrawer'}]});
      }
    }
  };

  React.useEffect(() => {
    if (!dbUser.isLoading) {
      setTimeout(() => {
        bootstrap();
      }, 2000);
    }
  }, [initializing, dbUser]);
  return (
    <ScrollLayout edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
      </View>
    </ScrollLayout>
  );
};

export default SplashScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    logo: {
      width: wp(100),
      height: wp(100),
      resizeMode: 'contain',
    },
  });
