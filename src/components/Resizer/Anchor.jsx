import { useRef, useState, useEffect } from 'react'
import { AnchorBase } from './AnchorBase'

export const Anchor = ({onWidthChange, location, container}) => {
    const self = useRef(null);
    const [ resizing, setResizing ] = useState(false);

    useEffect(() => {
        if(resizing === false) return;

        document.addEventListener('mouseup', stopResize, true);
        document.addEventListener('mousemove', onMouseMove, true);
        return () => {
            document.removeEventListener('mouseup', stopResize, true);
            document.removeEventListener('mousemove', onMouseMove, true);
        };
    });

    const y = location.startsWith("n") ? "top" : "bottom";
    const x = location.endsWith("w") ? "left" : "right";
    const cursor = `${location}-resize`;

    const onMouseMove = (event) => {
        const parentBox = self.current.parentNode.getBoundingClientRect();
        const containerBox = container.getBoundingClientRect();

        // Resizing bigger then the container is not allowed
        if(event.clientX < containerBox.x) return;
        if(event.clientX > containerBox.x + containerBox.width) return;

        // Resize at the edge of container box is not allowed
        if(x === "left" && parentBox.x === containerBox.x) return;
        if(x === "right" && (parentBox.x + parentBox.width) === (containerBox.x + container.width)) return;

        // Calculate when width
        const width = (x ==="right") ? event.clientX - parentBox.x : parentBox.x + parentBox.width - event.clientX;
        self.current.parentNode.style.width = width + "px";
    }

    const stopResize = () => {
        setResizing(false)
        if(!onWidthChange) return;

        const containerBox = container.getBoundingClientRect();
        const width = (parseFloat(self.current.parentNode.style.width.slice(0, -2)) / containerBox.width * 100) + "%";
        onWidthChange(width);
    }

    if(resizing === false) return <AnchorBase ref={self} x={x} y={y} cursor={cursor} onMouseDown={() => {setResizing(true)}} />
    return <AnchorBase ref={self} x={x} y={y} cursor={cursor} />
}