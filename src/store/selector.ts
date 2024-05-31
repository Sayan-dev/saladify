import {shallow} from 'zustand/shallow';
import useUserStore from './index';
import {User, UserRegisterRequest} from '../types/entities';

export const useUser = () =>
  useUserStore(state => [state.user, state.updateUser], shallow) as [
    User | null,
    (user: User | null) => void,
  ];

export const useRegisteredUser = () =>
  useUserStore(
    state => [state.registeredUser, state.updateRegisteredUser],
    shallow,
  ) as [
    UserRegisterRequest | null,
    (registeredStudent: UserRegisterRequest | null) => void,
  ];
