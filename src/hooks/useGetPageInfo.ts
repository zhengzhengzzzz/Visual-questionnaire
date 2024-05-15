import { shallowEqual } from "react-redux";
import { useAppSelector } from "../store";

function useGetPageInfo() {
  const pageInfo = useAppSelector((state) => state.pageInfo, shallowEqual);
  return pageInfo;
}

export default useGetPageInfo;
