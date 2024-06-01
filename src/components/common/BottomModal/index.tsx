import React from 'react';
import { StyleSheet } from 'react-native';
import RNModal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import type { ExtendedTheme } from '../../../types';
import ModalHeader from './Header';
import ModalContainer from './Container';
import ModalBody from './Body';
import ModalFooter from './Footer';
import CloseButton from './CloseButton';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  [x: string]: any;
};
const BottomModal = ({ isVisible = false, onClose, children, ...props }: ModalProps) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.container}
      {...props}
    >
      <CloseButton onClose={onClose} />
      {children}
    </RNModal>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      padding: 0,
      flex: 0,
      height: heightPercentageToDP(60),
      margin: 0,
      bottom: 0,
      width: '100%',
      position: 'absolute',
    },
  });

BottomModal.Header = ModalHeader;
BottomModal.Container = ModalContainer;
BottomModal.Body = ModalBody;
BottomModal.Footer = ModalFooter;

export default BottomModal;
