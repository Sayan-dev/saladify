import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {User} from '../types/entities';

function useInitializeFirebase() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();

  // Handle user state changes
  function onAuthStateChanged(userData: any) {
    setUser(userData);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return [user, initializing];
}

export default useInitializeFirebase;
