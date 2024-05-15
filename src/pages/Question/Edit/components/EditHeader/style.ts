import styled from "styled-components";

export const HeaderWrapper = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 11px 0;
  .header {
    display: flex; //左中右布局
    margin: 0 24px;
    h1 {
      font-size: 18px;
      margin-bottom: 0;
      line-height: 1;
    }
    .left {
      flex: 1;
    }
    .main {
      flex: 1;
      text-align: center;
    }
    .right {
      flex: 1;
      text-align: right;
    }
  }
`;
