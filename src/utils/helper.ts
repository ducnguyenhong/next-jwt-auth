import { userInfoState } from '@/states/user.recoil';
import Cookies from 'js-cookie';
import { useResetRecoilState } from 'recoil';
import { CK_TOKEN_KEY, LS_USER_KEY } from './const';

export const useLogout = () => {
  const resetUserInfo = useResetRecoilState(userInfoState);

  return () => {
    resetUserInfo();
    Cookies.remove(CK_TOKEN_KEY);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LS_USER_KEY);
      window.location.href = `${process.env.NEXT_PUBLIC_IVND}/logout?redirect-app=${process.env.NEXT_PUBLIC_IVND_KEY}`;
    }
  };
};
