import {useCallback, useState} from "react";

export default function useRender() {
    const [key, setKey] = useState(0);
    const render = useCallback( () => {
        setKey(key + 1);
    }, [key]);

    return {renderKey: key, render}
}
