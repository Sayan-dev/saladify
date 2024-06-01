import {useEffect, useState} from 'react';
import {API_BASE} from 'react-native-dotenv';
import io, {Socket} from 'socket.io-client';
import auth from '@react-native-firebase/auth';
import {OrderEvent} from '../types/entities';

export default function useSocket() {
  const [socketIo, setSocket] = useState<Socket>();
  const setSocketIo = async () => {
    const token = await auth().currentUser?.getIdToken();
    const socket = io(API_BASE, {
      auth: {
        token: `Bearer ${token}`,
      },
    });
    setSocket(socket);

    // socket.on(OrderEvent.take_order, () => {
    //   console.log('Taken Order');
    //   setTakenOrder(true);
    // });
    // socket.on(OrderEvent.prepare_order, () => {
    //   console.log('Prepared Order Order');
    //   setPrepareOrder(true);
    // });
    return socket;
  };
  useEffect(() => {
    setSocketIo();
    return () => {
      socketIo?.disconnect();
    };
  }, []);

  return socketIo;
}
