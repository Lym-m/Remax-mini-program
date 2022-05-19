import React, {useCallback, useMemo, useState} from "react";
import {Image, View} from 'remax/wechat';
import VanPopup from '@vant/weapp/lib/popup';
import styles from '@/styles/index.less';

interface UseCustomToastParam {
    message: string;
    type?: 'success' | 'fail';
    duration?: number;
}

export default function useCustomToast() {
    const [show, setShow] = useState(false);
    const [showParam, setShowParam] = useState<UseCustomToastParam>({} as UseCustomToastParam);
    const { message, type = 'success' } = showParam;

    const toast = useMemo(() => {
        const img = type === 'success' ? '' : '';
        return (
            <VanPopup class={styles.customToast} show={show} round position="center">
                <View className={styles.content}>
                    <Image className={styles.icon} src={img} />
                    <View>{message}</View>
                </View>
            </VanPopup>
        )
    }, [message, show, type])

    const showToast = useCallback((param: UseCustomToastParam) => {
        const newParam = {...showParam, ...param};
        setShowParam(newParam);
        setShow(true);
        return new Promise<void>(resolve => {
           const {duration = 0} = newParam;
           setTimeout(() => {
               setShow(false);
               resolve();
           }, duration)
        });
    }, [])

    const hideToast = useCallback(() => {
        setShow(false);
    }, [])

    return {toast, showToast, hideToast}
}
