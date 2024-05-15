import styled from "styled-components";

export const HeaderWrapper = styled.div `
background-color:#fff;
border-bottom: 1px solid #e8e8e8;
padding: 12px 0;
.header{
    display: flex;
    margin: 0 24px;
    .left{
        flex: 1;
        h1{
            font-size: 18px;
            margin-bottom:0;
            line-height: 1;
        }
    }
    .right{
        flex: 1;
        text-align: right;
    }
    .main{
        flex: 1;
        text-align: center;
    }
}
`