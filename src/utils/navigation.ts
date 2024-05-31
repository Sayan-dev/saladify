import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../RootNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function reset(_arg0: string) {
  throw new Error('Function not implemented.');
}
