import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const listener = AppState.addEventListener('change', onChange);

    return () => {
      listener.remove();
    };
  }, [onChange]);
}

export default useAppState;
