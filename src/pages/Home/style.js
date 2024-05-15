import styled from "styled-components";

export const HomeWrapper = styled.div `
 height: calc(100vh - 64px - 65px);
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 background-image: linear-gradient(to right,#4facfe 0%,#00f2fe 100%);
 .info{
    text-align: center;
    button{
        height: 60px;
        font-size: 24px;
    }
 }

`