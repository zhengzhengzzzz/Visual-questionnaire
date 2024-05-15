import styled from "styled-components";

// 左侧面板组件库样式
export const Wrapper = styled.div`
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #fff;
  padding: 12px;
  border-radius: 3px;

  &:hover {
    border-color: #d9d9d9;
  }
  .component {
    pointer-events: none; //防止鼠标点击行为
  }
`;
