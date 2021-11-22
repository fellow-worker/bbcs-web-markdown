import styled from "styled-components";

export const VideoContainer = styled.span`
    overflow:hidden;
    display: block;
    padding-bottom:56.25%;
    position:relative;
    height:0;
    border: 1px solid rgba(0,0,0,0.1) !important;

    iframe, video {
        left:0;
        top:0;
        height:100%;
        width:100%;
        position:absolute;
        padding: 0px;
    }
`