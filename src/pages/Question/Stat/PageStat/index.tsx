import { useRequest } from "ahooks";
import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { getQuestionStatListService } from "../../../../services/stat";
import { Pagination, Spin, Table, Typography } from "antd";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE } from "../../../../constant";

interface IProps {
  selectedComponentId: string;
  setselectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}

const { Title } = Typography;

const PageStat: FC<IProps> = (props: IProps) => {
  const {
    selectedComponentId,
    setSelectedComponentType,
    setselectedComponentId,
  } = props;
  const { id = "" } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, {
        page: 1,
        pageSize: 10,
      });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    }
  );

  const { componentList } = useGetComponentInfo();
  const columns = componentList.map((c) => {
    const { fe_id, title, props = {}, type } = c;
    const colTitle = props.title || title;
    return {
      title: (
        <div
          onClick={() => {
            setSelectedComponentType(type);
            setselectedComponentId(fe_id);
          }}
          style={{ cursor: "pointer" }}
        >
          <span
            style={{
              color: fe_id === selectedComponentId ? "#1890ff" : "inherit",
            }}
          >
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
  const TableElem = (
    <>
      {" "}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      ></Table>
      <div style={{ textAlign: "center", marginTop: "18px" }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};
export default memo(PageStat);
