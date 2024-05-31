import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {CompositeScreenProps, useTheme} from '@react-navigation/native';
import ScrollLayout from '../components/layouts/ScrollLayout';
import type {ExtendedTheme} from '../types';
import TopBar from '../components/home/TopBar';
import Heading from '../components/home/Heading';
import {DrawerParamList} from '../HomeDrawerNavigation';
import {RootStackParamList} from '../RootNavigator';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <ScrollLayout
      scrollViewProps={{style: styles.container}}
      edges={['top', 'left', 'right']}>
      <TopBar openDrawer={openDrawer} />
      <Heading user={{firstName: 'Sayanta'}} />
    </ScrollLayout>
  );
};

export default HomeScreen;

const createStyles = (_theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {},
  });
