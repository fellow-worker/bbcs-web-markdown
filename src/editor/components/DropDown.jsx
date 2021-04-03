import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ArrowDropDown, ArrowDropUp } from '@styled-icons/material-outlined'

import { Button } from './Button'

export const DropDown = ({icon, text, options, onSelect, active}) => {

    const [ expanded, setExpanded ] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target) === false) setExpanded(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const onButtonClick = () => {
        setExpanded(!expanded);
    }

    const onOptionClick = (event, blockType) => {
        event.preventDefault();
        setExpanded(false);
        if(onSelect) onSelect(blockType)
    }

    const caret =  expanded ? <ArrowDropUp /> : <ArrowDropDown />;

    return (
        <Container ref={ref}>
            <Button onClick={onButtonClick} active={active} tooltip={text}>{icon}&nbsp;{caret}</Button>
            { expanded && <Options options={options} onClick={onOptionClick} /> }
        </Container>
    )
}

const Options = ({onClick, options}) => {
    return (
        <Wrapper className="editor">
            <List>
                { options.map(option => <Option key={option.blockType} option={option} onClick={onClick} />) }
            </List>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:absolute;
`

const Option = ({option, onClick }) => {
    return <ListItem onMouseDown={event => onClick(event, option.blockType)}>{option.example}</ListItem>
}

const ListItem = styled.li`
    color: #444444 !important;
    padding: 6px 20px;
    text-decoration: none;
    color: #141414;
    background-color: #eeeeee;
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 1.846;
    white-space: nowrap;
`

const Container = styled.div`
    display:block;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    left: inherit;
    box-shadow: none !important;
    border: 1px solid rgba(0,0,0,0.1) !important;
    border-top-width:0px;
    position: absolute;
    display:block;
    top: 100%;
    z-index: 1000;
    float: left;
    min-width: 160px;
    list-style: none;
    font-size: 13px;
    text-align: left;
    background-color: #ffffff;
    border-radius: 3px;
    background-clip: padding-box;
    max-height: 200px;
    overflow: auto;

    cursor: pointer;

    li {
        background-color: #ffffff;
    }

    li:hover {
        background-color: #f9f9f9;
    }
`