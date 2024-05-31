import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ScrollLayout from '../components/layouts/ScrollLayout';
import type {ExtendedTheme} from '../types';
import TopBar from '../components/home/TopBar';
import Heading from '../components/home/Heading';

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <ScrollLayout
      scrollViewProps={{style: styles.container}}
      edges={['top', 'left', 'right']}>
      <TopBar openDrawer={() => {}} />
      <Heading user={{firstName: 'Sayanta'}} />
    </ScrollLayout>
  );
};

export default HomeScreen;

const createStyles = (_theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {},
  });
