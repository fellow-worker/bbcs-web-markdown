import { Border } from './Resizer/Border'
import { Anchor } from './Resizer/Anchor'

const Resizer = ({children, onWidthChange, container, width}) => {
    return (
        <Border width={width}>
            {children}
            <Anchor location="nw" onWidthChange={onWidthChange} container={container} />
            <Anchor location="ne" onWidthChange={onWidthChange} container={container} />
            <Anchor location="sw" onWidthChange={onWidthChange} container={container} />
            <Anchor location="se" onWidthChange={onWidthChange} container={container} />
        </Border>
    )
}

export default Resizer