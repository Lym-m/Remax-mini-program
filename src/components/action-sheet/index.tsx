import React from 'react';
import styles from './index.scss';
import VanActionSheet from '@vant/weapp/lib/action-sheet';
import clsx from 'clsx';

interface ActionItem {
  name: string;
  color?:	string;
  loading?:	boolean;
  disabled?:	boolean;
  className?: string;
}

interface ActionProps {
  show: boolean;
  actions: Array<ActionItem>;
  className?: string;
  round?: boolean;
  cancelText?: string;
  onSelect?: (value: string) => void;
  onClose?: () => void;
}

export default function ActionSheet(props: ActionProps): JSX.Element {
  const {
    round = false,
    cancelText = '取消',
  } = props;

  const confirm = (e: any) => {
    props.onSelect?.(e.detail.name);
  };

  return (
    <VanActionSheet
      class={clsx(props.className, styles.actions)}
      show={props.show}
      actions={props.actions}
      round={round}
      bind:close={props.onClose}
      bind:cancel={props.onClose}
      bind:select={confirm}
      cancel-text={cancelText}
    />
  );
}
