import styled from 'styled-components';

export const Button = ({children, tooltip, onClick, active, disabled}) => {

    const preventDefault = e => { e.preventDefault(); };

    const onButtonClick = e => {
        preventDefault(e);
        if(disabled !== true) onClick();
    }

    let color = 'white';
    if(disabled) color = '#f5f5f5';
    if(active) color = '#ededed';

    return (
        <StyledButton color={color} onMouseDown={preventDefault} onMouseUp={preventDefault} onClick={onButtonClick}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    height: 36px;
    font-size: 13px;
    border: 1px solid rgba(0,0,0,.1);
    color: #444444;
    background-color: ${props => props.color };
    display: block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    cursor: pointer;
    font-weight:bold;

    &:focus {
        border: 1px solid rgba(0,0,0,.1);
        outline:none;
    }

    &:hover {
        background-color:#eeeeee;
    }

    svg {
        height: 20px;
    }
`;