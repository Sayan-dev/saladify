import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type {ExtendedTheme} from '../../../types';
import useLike from '../../../hooks/useLike';

type LikeProductProps = {
  productId: string;
};

const LikeButton = ({productId}: LikeProductProps) => {
  const theme = useTheme();

  const [like, handleLike] = useLike(productId);

  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={handleLike} style={styles.container}>
      <View style={styles.iconWrapper}>
        {like ? (
          <Icon style={styles.icon} size={24} name="heart" />
        ) : (
          <Icon style={styles.icon} size={24} name="heart-o" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LikeButton;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 20,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
      alignSelf: 'flex-start',
    },
    iconWrapper: {
      backgroundColor: theme.colors.border,
      alignSelf: 'flex-start',
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      width: 48,
      borderRadius: 48,
    },
    icon: {
      color: theme.colors.primary,
    },
    info: {
      paddingVertical: 18,
    },
  });
