import React from 'react';
import {View, TouchEvent} from 'remax/wechat';
import styles from './index.scss';
import VanPopup from '@vant/weapp/lib/popup';
import VanButton from '@vant/weapp/lib/button';
import clsx from 'clsx';

interface SelectPopupProps {
  show: boolean;
  title?: string;
  /**
   * 固定模式，固定为最大高度。
   * 在css中提供了 --select-popup-title-height tile高度以及 --select-popup-bottom-height 底部高度两个css变量方便子组件使用
   * 子组件如果使用scroll-view会设置为绝对布局，top: --select-popup-title-height; bottom: --select-popup-bottom-height，其他为0
   */
  fixed?: boolean;
  catchTouchMove?: boolean; // 是否截断touchMove，如果阶段可能导致内部无法滚动
  children?: React.ReactNode;
  confirmClick?: (e: TouchEvent) => void;
  cancelClick?: (e: TouchEvent) => void;
}

const touchmove = () => null;

/**
 * 对popup的一层封装，添加确认和取消按钮，添加固定模式（fixed），可以固定到最大高度。
 */
export function SelectPopup(props: SelectPopupProps): JSX.Element {
  const {
    fixed = false,
    catchTouchMove = false
  } = props;
  return (
    <VanPopup
      show={props.show}
      position="bottom"
      round
      class={clsx(styles.selectPopup, fixed ? styles.fixed : '')}
      bind:close={props.cancelClick}
      catch:touchmove={catchTouchMove ? touchmove : null}
    >
      <View className={styles.popupContent}>
        <View
          className={styles.popupTitle}
        >{props.title}</View>
        <View className={clsx(styles.popupBody)}>
          {props.children}
        </View>
      </View>
      <View className={styles.actions}>
        <View className={styles.buttonWrap} style={{ marginRight: '15px' }}>
          <VanButton
            custom-style={{ color: '#9ea1a8' }}
            class={styles.button} type="info"
            block
            round
            color="#dadce0"
            bind:click={props.cancelClick}
          >取消</VanButton>
        </View>
        <View className={styles.buttonWrap}>
          <VanButton
            class={styles.button}
            type="info"
            block
            round
            bind:click={props.confirmClick}
          >确定</VanButton>
        </View>
      </View>
    </VanPopup>
  );
}
