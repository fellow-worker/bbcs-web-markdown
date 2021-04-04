import styled from 'styled-components';

export const Border = styled.div`
    border: 1px solid black;
    display:inline-flex;
    padding:2px;
    width:${props => props.width};
    position:relative;
    -webkit-user-select: none;
    user-select: none;

    img {
        width:100%;
        -webkit-user-select: none;
        user-select: none;
    }
`