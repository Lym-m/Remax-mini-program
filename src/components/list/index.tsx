import React, {useCallback, useEffect, useState, useImperativeHandle, forwardRef} from 'react';
import { View, ScrollView, createSelectorQuery } from 'remax/wechat';
import styles from './index.less';
import clsx from 'clsx';
import useRender from '@/hooks/use-render';
import VanLoading from '@vant/weapp/lib/loading';
import VanEmpty from  '@vant/weapp/lib/empty';

type BoundingClientRectCallbackResult = WechatMiniprogram.BoundingClientRectCallbackResult;
type ScrollOffsetCallbackResult = WechatMiniprogram.ScrollOffsetCallbackResult;

type ListProps =
    {
        finished: boolean; // 加载是否完成，如果已经加载完成则不会再调用load函数加载。
        empty?: boolean; // 当前是否为空，默认为false，如果为空则会展示为空提示。
        load: (count: number) => Promise<void>; // 加载函数，开始或者向下滑动快到底部的时候会自动调用，count为页面1为开始。
        offset?: number; // 距离底部多少时触发下一页加载。
        immediateCheck?: boolean; // 是否马上加载数据，如果关闭则不会加载数据。
        refresherEnabled?: boolean; // 是否开启下拉加载数据功能。
        children: React.ReactNode;
        scrollViewClassName?: string;
        // 刷新的回调函数，不管是通过下拉刷新还是ref引用refresh刷新都会调用。如果出现返回之后加载数据重复应该就是需要将清空数据的代码移到这个回调上来
        onRefresh?: () => void;
        onPreRefresh?: () => void; // 在调用刷新之前的回调函数
    } &
    ComponentStyleProps

function List(props: ListProps, ref: React.Ref<unknown>): JSX.Element {
    const {
        finished,
        empty = false,
        load,
        offset = 300,
        immediateCheck = true,
        refresherEnabled = false
    } = props;

    const [id] = useState(`scroll-${Date.now()}`);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refresher, setRefresher] = useState(false);
    const { renderKey: firstLoadingKey, render: firstLoadingRender } = useRender();

    const refresherTriggered = refresherEnabled && refresher;

    const loadMore = useCallback(() => {
        if (finished) return Promise.resolve();
        // 如果当前在loading，那么上一次loadMore还未结束，不开启下一次的加载。
        if (loading) return Promise.resolve();
        setLoading(true);
        return load(count)
            .then(() => {
                setCount(count + 1);
                setLoading(false);
            });
    }, [count, finished, load, loading]);

    const onRefresh = props.onRefresh;
    const onPreRefresh = props.onPreRefresh;
    // reload在父组件调用会更加注重调用时机，有可能会造成重复加载的bug
    const reload = useCallback((useRefresh = false) => {
        // refresher设置为true会直接触发onRefresherRefresh，某些场景下可能导致两次触发reload
        // 第一次为手动调用reload，然后设置refresher为true触发第二次reload
        // -----------------------------------------------------------
        // 因此只能通过refresher为false的时候触发
        // 当refresher为true的时候说明上次reload还未完成，不能够再次触发
        if (refresher) {
            return;
        }

        onPreRefresh?.();

        setCount(1);
        if (useRefresh) {
            setRefresher(true);
        }
        firstLoadingRender();
        onRefresh?.();
    }, [firstLoadingRender, onPreRefresh, onRefresh, refresher]);

    useImperativeHandle(ref, () => ({
        reload
    }), [reload]);

    // 初始状态下加载数据，需要判定每次加载的数据是否将scroll-view填满，如果没填满则继续加载。
    useEffect(() => {
        // 不在加载状态下并且未完成才可以继续加载
        // 如果是已完成后手动刷新数据，此时并不能重新加载，需要外部将完成状态改为false
        // fixme: 是否需要加入finished作为判断依据用于规避finished = true这种极端场景下出现的一直加载的问题
        if (immediateCheck && !loading && !finished) {
            // fixme: 当切换到当前List马上又被销毁或者切换到其他页面的时候，应该主动停止后续动作
            loadMore()
                .then(() => {
                    // setRefresher(false);
                    return new Promise(resolve => {
                        const query = createSelectorQuery();
                        query.select(`#${id}`).scrollOffset();
                        query.selectViewport().boundingClientRect();
                        query.exec(res => resolve(res));
                    });
                })
                .then(res => {
                    const [
                        { scrollHeight },
                        { height }
                    ] = (res as [ScrollOffsetCallbackResult & { scrollHeight: number, scrollWidth: number } , BoundingClientRectCallbackResult]);
                    if ((height + offset) >= scrollHeight) {
                        // 不能直接在这里调用loadMore。此时loadMore中的count与load函数均未更新，调用有可能只会不断重复当前动作。
                        firstLoadingRender();
                    }
                    // 最后设置，阻止reload重复调用的场景
                    setRefresher(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstLoadingKey, finished, immediateCheck]); // 第一次、或者firstLoadingKey变化的时候触发，当finished改变时也应该触发（主要是在refresh的时候）

    let tip: React.ReactNode = '';
    if (finished) {
        tip = empty ? <VanEmpty description="暂无数据"/> : '没有更多了';
    } else if (loading) {
        tip = <VanLoading type="spinner">加载中...</VanLoading>;
    }

    return (
        <View className={clsx(styles.list, props.className)} style={props.style}>
            <ScrollView
                id={id}
                scrollY
                lower-threshold={offset}
                onScrollToLower={loadMore}
                className={clsx(styles.scrollView, props.scrollViewClassName)}
                refresherEnabled={refresherEnabled}
                onRefresherRefresh={() => reload(true)}
                refresherTriggered={refresherTriggered}
            >
                {props.children}
                <View className={styles.bottomMessage}>
                    {tip}
                </View>
            </ScrollView>
        </View>
    );
}

export default forwardRef(List);
