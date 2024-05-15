import React, { memo, useMemo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { HeaderWrapper } from "./style";
import {
  Button,
  Input,
  InputRef,
  Popover,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

const StatHeader: FC<IProps> = () => {
  const nav = useNavigate();
  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();

  const urlInputRef = useRef<InputRef>(null);

  //   拷贝链接
  function copy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); //选中input的内容
    document.execCommand("copy"); //拷贝选中内容
    message.success("拷贝成功");
  }

  // 使用useMemo 1.依赖项是否经常变化 2.缓存元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    // 拼接url 需要参考c端的规则
    const url = `http://localhost:3000/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: "300px" }} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }, [isPublished, id]);

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="left">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className="main">{LinkAndQRCodeElem}</div>
        <div className="right">
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </HeaderWrapper>
  );
};
export default memo(StatHeader);
