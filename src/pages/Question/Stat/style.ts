import styled from "styled-components";

export const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  min-height: 100vh;

  .content-wrapper {
    flex: auto;
    padding: 12px 0;
  }
  .content {
    margin: 0 24px;
    display: flex;
    .left {
      width: 350px;
      margin-right: 24px;
    }
    .main {
      flex: auto;
      background-color: #fff;
      padding: 12px 18px;
    }
    .right {
      width: 400px;
      margin-left: 24px;
      padding: 12px 18px;
      background-color: #fff;
      /* overflow-x: auto; */
    }
  }
`;
