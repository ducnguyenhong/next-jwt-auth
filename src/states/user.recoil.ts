import { LS_USER_KEY } from '@/utils/const';
import Cookies from 'js-cookie';
import { DefaultValue, atom, selector } from 'recoil';

const userInfoAtom = atom({
  key: 'USER_INFO_ATOM',
  default: new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
    }
    const userInfo = Cookies.get(LS_USER_KEY);
    if (!userInfo) {
      resolve(null);
      return;
    }
    resolve(JSON.parse(userInfo));
  })
});

export const userInfoState = selector({
  key: 'USER_INFO_STATE',

  get: ({ get }) => get(userInfoAtom),

  set: ({ set }, data) => {
    if (!data || data instanceof DefaultValue) {
      Cookies.remove(LS_USER_KEY);
      set(userInfoAtom, null);
      return;
    }
    Cookies.set(LS_USER_KEY, JSON.stringify(data));
    set(userInfoAtom, data);
  }
});
