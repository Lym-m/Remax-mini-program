import {DependencyList, useCallback, useEffect, useState} from 'react';
import { useAsyncFn } from 'react-use';
import {FunctionReturningPromise} from 'react-use/lib/misc/types';
import {AsyncFnReturn} from 'react-use/lib/useAsyncFn';
import {usePageEvent} from 'remax/macro';
import {hideLoading, showLoading} from 'remax/wechat';

type UseFetchDataReturn<T extends FunctionReturningPromise> = Exclude<AsyncFnReturn<T>[number], T>  & {retry: () => void}

export default function useFetchData<T extends FunctionReturningPromise>(
    fetchFunc: T,
    deps: DependencyList = [],
    options: {
        initData?: any;
        retryOnReshow?: boolean;
        useLoading?: boolean;
    }
): UseFetchDataReturn<T> {
    const {
        retryOnReshow = false,
        useLoading = false,
    } = options;

    const [attempt, setAttempt] = useState(0);
    const [state, callback] = useAsyncFn(fetchFunc, [...deps, attempt], { loading: true, value: options?.initData });

    useEffect(() => {
        callback();
    }, [callback]);

    const stateLoading = state.loading;
    const retry = useCallback(() => {
        if (stateLoading) {
            if (process.env.NODE_ENV === 'development') {
                console.warn('You are calling useAsyncRetry hook retry() method while loading in progress, this is a no-op.');
            }
            return;
        }
        setAttempt((current) => current + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, stateLoading]);

    const [hidden, setHidden] = useState(false);
    usePageEvent('onHide', () => {
        setHidden(true);
    });
    usePageEvent('onShow', () => {
        if (retryOnReshow && hidden) {
            setHidden(false);
            retry();
        }
    });

    useEffect(() => {
        if (useLoading && state.loading) {
            showLoading({ title: '请稍等...', mask: true });
        } else if (useLoading && !state.loading) {
            hideLoading();
        }
    }, [state.loading, useLoading]);

    const res = state as UseFetchDataReturn<T>;
    res.retry = retry;

    return res;
}
