import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { loginReducer } from "../store/modules/user";
import { shallowEqual } from "react-redux";

export default function useLoadUserData() {
  const [waitUserData, setWaitUserData] = useState(true);

  const dispatch = useAppDispatch();

  const { username } = useAppSelector(
    (state) => ({
      username: state.user.username,
    }),
    shallowEqual
  );

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result.data.data;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitUserData(false);
    },
  });

  useEffect(() => {
    if (username) {
      setWaitUserData(false);
      return;
    }
    run();
  }, [username]);

  return { waitUserData };
}
