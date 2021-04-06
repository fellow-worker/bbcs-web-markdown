import { Border } from './Resizer/Border'
import { Anchor } from './Resizer/Anchor'

const Resizer = ({children, onWidthChange, container, width, parent }) => {
    return (
        <Border width={width}>
            {children}
            <Anchor parent={parent} location="nw" onWidthChange={onWidthChange} container={container} />
            <Anchor parent={parent} location="ne" onWidthChange={onWidthChange} container={container} />
            <Anchor parent={parent} location="sw" onWidthChange={onWidthChange} container={container} />
            <Anchor parent={parent} location="se" onWidthChange={onWidthChange} container={container} />
        </Border>
    )
}

export default Resizer