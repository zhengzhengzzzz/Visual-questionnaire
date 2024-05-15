import { useAppSelector } from "../store";
import { shallowEqual } from "react-redux";

function useGetUserInfo() {
  const { username, nickname } = useAppSelector(
    (state) => ({
      username: state.user.username,
      nickname: state.user.nickname,
    }),
    shallowEqual
  );
  return { username, nickname };
}

export default useGetUserInfo;
