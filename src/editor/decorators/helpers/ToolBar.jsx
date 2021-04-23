import styled from 'styled-components'
import { ZoomOutMap, FormatAlignLeft, FormatAlignRight } from '@styled-icons/material-outlined'
import { Trash } from '@styled-icons/bootstrap/Trash'
import { Button } from 'editor/components/Button'

const ToolBar = ({show, onEnterResize, onWidthChange, onAlignmentChange, alignment, onDeleteBlock }) => {

    if(show === false) return null;

    const onAlignmentClick = (align) => {
        const updated = (align === alignment) ? 'none' : align;
        onAlignmentChange(updated);
    }

    return (
        <Wrapper>
            <ToolsWrapper>
                <Tools>
                    <Button onClick={() => onWidthChange('100%')} >100%</Button>
                    <Button onClick={() => onWidthChange('50%')}>50%</Button>
                    <Button active={alignment === 'left'} onClick={() => onAlignmentClick('left')}><FormatAlignLeft /></Button>
                    <Button active={alignment === 'right'} onClick={() => onAlignmentClick('right')}><FormatAlignRight /></Button>
                    <Button onClick={onEnterResize}><ZoomOutMap /></Button>
                    <Button onClick={onDeleteBlock}><Trash /></Button>
                </Tools>
            </ToolsWrapper>
            <Caret />
        </Wrapper>
    )
}

export default ToolBar

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position:absolute;
    top:10px;
    left:10px;
    z-index:2;
`

const ToolsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Tools = styled.div`
    color: #212121;
    background-color: #f5f5f5;
    border: 1px solid #dddddd;
    padding: 5px;
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
`

const Caret = styled.div`
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-top: 11px solid #dddddd;
  position:relative;
  left:10px;

  &:after {
    content:'';
    position:absolute;
    width: 0;
    height: 0;
    z-index:3;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 11px solid #f5f5f5;
    top:-12px;
    left:-10px;
   }
`