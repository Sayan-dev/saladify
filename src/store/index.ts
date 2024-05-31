import {create, StateCreator} from 'zustand';
import {User, UserRegisterRequest} from '../types/entities';

interface UserSlice {
  user: User | null;
  updateUser: (user: User | null) => void;
}

interface UserRegisterSlice {
  registeredUser: UserRegisterRequest | null;
  updateRegisteredUser: (registeredUser: UserRegisterRequest | null) => void;
}

type Slice = UserSlice & UserRegisterSlice;

const createUserSlice: StateCreator<Slice, [], [], UserSlice> = set => ({
  user: null,
  updateUser: (user: User | null) => set(state => ({...state, user})),
});

const createUserRegisterSlice: StateCreator<
  Slice,
  [],
  [],
  UserRegisterSlice
> = set => ({
  registeredUser: null,
  updateRegisteredUser: (registeredUser: UserRegisterRequest | null) =>
    set(state => ({...state, registeredUser})),
});

const useUserStore = create<Slice>()((...rest) => ({
  ...createUserSlice(...rest),
  ...createUserRegisterSlice(...rest),
}));

export default useUserStore;
