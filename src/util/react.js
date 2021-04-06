import { useState } from 'react'

export const useForceUpdate = () => {
    const [it, setIt] = useState(false);
    const update = () => { setIt(!it); }
    return update;
}