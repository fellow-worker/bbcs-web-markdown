import styled from 'styled-components'

export const AnchorBase = styled.div`
    position:absolute;
    border: 1px solid black;
    background-color:white;
    z-index:1;
    left : ${props => props.x === "left" ? "-3px" : "auto"};
    right : ${props => props.x === "right" ? "-3px" : "auto"};
    top : ${props => props.y === "top" ? "-3px" : "auto"};
    bottom : ${props => props.y === "bottom" ? "-3px" : "auto"};
    cursor: ${props => props.cursor};
    height:4px;
    width:4px;
`