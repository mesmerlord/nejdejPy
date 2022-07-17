// @ts-nocheck
import { useLayoutEffect } from 'react';
import createContext from 'zustand/context';
import create from 'zustand';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';
import customInstance, { AXIOS_INSTANCE } from '../api/custom-instance';
import { apiUsersMeRetrieve } from '../api/api';

let store;

const getDefaultInitialState = () => ({
  isAnimating: false,
  userInfo: null,
  accessToken: '',
});
const zustandContext: any = createContext();
export const Provider = zustandContext.Provider;
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
    setAccessToken: (accessToken) => {
      set((state) => ({ accessToken }));
      setCookie(null, 'accessToken', accessToken, { path: '/' });
    },
    setProfile: (profile) => {
      set(() => ({ profile }));
    },
    axiosRun: () => {
      const cookies = parseCookies();
      const token = cookies?.accessToken;
      if (token) {
        AXIOS_INSTANCE.interceptors.request.use(function (config) {
          config.headers.Authorization = token ? `Token ${token}` : null;
          return config;
        });
      }
    },
    logOut: () => {
      set(() => ({ accessToken: null }));
      destroyCookie(null, 'accessToken', { path: '/' });
    },
    logIn: (accessToken) => {
      set(() => ({ accessToken }));
      setCookie(null, 'accessToken', accessToken, { path: '/' });
    },
    setUserInfo: () => {
      const token = get().accessToken;
      AXIOS_INSTANCE.interceptors.request.use(function (config) {
        config.headers.Authorization = token ? `Token ${token}` : null;
        return config;
      });

      apiUsersMeRetrieve()
        .then((response) => {
          const resp = response.data;
          console.log(resp);
          set((state) => ({ userInfo: resp }));
        })
        .catch((err) => {
          console.log(err);
          //   destroyCookie(null, 'accessToken', { path: '/' });
        });
    },
  }));
};

export function useCreateStore(serverInitialState) {
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
}
