import {useState} from "react";
import {usePageEvent} from "remax/macro";

export default function usePageBack(callback: () => void): boolean {
    const [hidden, setHidden] = useState(false);
    usePageEvent('onShow', () => {
        if (hidden) {
            setHidden(false);
            callback()
        }
    });
    usePageEvent('onHide', () => setHidden(true));
    return hidden;
}
