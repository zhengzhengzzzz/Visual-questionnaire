import styled from "styled-components";

export const CanvasWrapper = styled.div`
  min-height: 100%;
  background-color: #fff;
  overflow: hidden;
  /* 每个组件的样式 */
  .component-wrapper {
    margin: 12px;
    border: 1px solid #fff;
    padding: 12px;
    border-radius: 3px;

    &:hover {
      border-color: #d9d9d9;
    }
    .component {
      /* 屏蔽鼠标行为 组件不让被点击到 */
      /* 不能写到上一层 因为上一层还得点击选中组件 */
      pointer-events: none;
    }
  }
  /* 点击组件选中状态 */
  .selected {
    border-color: #1890ff !important;
  }
  .locked {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
