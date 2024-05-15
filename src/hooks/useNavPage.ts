import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import useLoadUserData from "./useLoadUserData";
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from "../router";
import { LOADIPHLPAPI } from "dns";

export default function useNavPage(waitUserData: boolean) {
  const nav = useNavigate();
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();

  useEffect(() => {
    if (waitUserData) return;

    // 已经登录了
    if (username) {
      if (isLoginOrRegister(pathname)) nav(MANAGE_INDEX_PATNAME);
      return;
    }
    //未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitUserData, username, pathname]);
}
