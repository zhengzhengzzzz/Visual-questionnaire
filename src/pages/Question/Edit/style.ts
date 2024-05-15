import styled from "styled-components";

export const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
  .header {
    height: 50px;
  }
  .content-wrapper {
    flex: auto;
    padding: 12px 0;
    background-color: #f0f2f5;
    .content {
      margin: 0 24px;
      display: flex;
      height: 100%;

      .left {
        width: 295px;
        background-color: #fff;
        padding: 0 12px;
      }
      .main {
        flex: 1;
        position: relative;
        overflow: hidden;
        .canvas-wrapper {
          position: absolute;
          width: 400px;
          height: 666px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          overflow: auto;
          box-shadow: 0 2px 10px #0000001f;
        }
      }
      .right {
        width: 300px;
        background-color: #fff;
        padding: 0 12px;
      }
    }
  }
`;
