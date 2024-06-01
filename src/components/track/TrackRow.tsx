import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import Typography from '../common/Typography';
import OrderStep1 from '../../assets/images/order_step_1.png';
import success from '../../assets/images/progress_success.png';
import { ExtendedTheme } from '../../types';

interface Props {
  name: string;
  backgroundColor: string;
  description?: string;
  status?: boolean; // Defines the Socket IO status
  image: ImageSourcePropType;
  progressImage: ImageSourcePropType;
  imageStyles?: StyleProp<ImageStyle>;
  imageBackgroundStyles?: StyleProp<ViewStyle>;
  progressImageStyles?: StyleProp<ImageStyle>;
}

const TrackRow = ({
  name,
  image,
  progressImage,
  backgroundColor,
  imageStyles,
  status,
  imageBackgroundStyles,
  progressImageStyles,
  description,
}: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.report}>
        <View style={[styles.imageBackground, imageBackgroundStyles, { backgroundColor }]}>
          <Image source={image} style={[styles.image, imageStyles]} />
        </View>
        <View style={styles.info}>
          <Typography fontStyle="medium" fontSize={16}>
            {name}
          </Typography>
          {description && (
            <Typography fontStyle="regular" fontSize={14}>
              {description}
            </Typography>
          )}
        </View>
      </View>
      {status && <Image source={progressImage} style={[styles.imageStatus, progressImageStyles]} />}
    </View>
  );
};

export default TrackRow;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    report: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    info: {
      marginLeft: 16,
    },
    checkoutButton: { flex: 2, width: '100%', paddingVertical: 14, justifyContent: 'center' },
    imageBackground: {
      padding: 4,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
    },

    imageStatus: {
      width: 24,
      height: 24,
    },
  });
