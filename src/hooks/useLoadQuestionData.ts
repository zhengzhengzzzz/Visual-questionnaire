import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { resetComponent } from "../store/modules/Edit/component";
import { useAppDispatch } from "../store";
import { resetPageInfo } from "../store/modules/Edit/pageInfo";

// export function useLoadQuestionData() {
//   const { id = "" } = useParams();

//   async function load() {
//     const data = await getQuestionService(id);
//     return data;
//   }

//   const { loading, data, error } = useRequest(load);

//   return { loading, data, error };
// }

export function useLoadQuestionData() {
  // 获取当前问卷的id
  const { id = "" } = useParams();

  const dispatch = useAppDispatch();

  // ajax变化
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷id");

      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true, //和run一起 手动执行ajax加载
    }
  );

  // 根据获取的data 设置 redux store
  useEffect(() => {
    if (!data) return;
    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      isPublished = false,
      componentList = [],
    } = data;

    // 获取默认的selectedId
    // 默认选中第一个组件
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    dispatch(
      resetComponent({ componentList, selectedId, copiedComponent: null })
    );
    // 把pageInfo存储搭配redux中
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
  }, [data]);

  // 判断id变化 执行ajax 加载问卷数据
  useEffect(() => {
    run(id);
  }, [id]);

  // 不需要返回data了 data已经在redux store中了
  return { loading, error };
}
