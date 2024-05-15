import styled from "styled-components";

export const CanvasWrapper = styled.div`
  min-height: 100%;
  background-color: #fff;
  overflow: hidden;
  .component-wrapper {
    margin: 12px;
    border: 1px solid #fff;
    padding: 12px;
    border-radius: 3px;

    &:hover {
      border-color: #d9d9d9;
    }
    .component {
      pointer-events: none;
    }
  }
  .selected {
    border-color: #1890ff !important;
  }
  .locked {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
