import { useState } from 'react'
import styled from 'styled-components';
import ToolBar from './ToolBar'

const ToolBarContainer = ({onWidthChange, onAlignmentChange, alignment, onEnterResize, children, onDeleteBlock}) => {

    const [ showToolBar, setShowToolBar ] = useState(false);

    const onMouseEnter = () => { setShowToolBar(true) }
    const onMouseLeave = () => { setShowToolBar(false) }

    const onWidthChangeHandler = (width) => {
        setShowToolBar(false);
        if(onWidthChange) onWidthChange(width)
    }

    return (
        <Wrapper className="toolbar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <ToolBar
                show={showToolBar}
                alignment={alignment}
                onWidthChange={onWidthChangeHandler}
                onEnterResize={onEnterResize}
                onAlignmentChange={onAlignmentChange}
                onDeleteBlock={onDeleteBlock}
            />
            {children}
        </Wrapper>
    );
}


const Wrapper = styled.div`
    width : 100%;
`

export default ToolBarContainer;