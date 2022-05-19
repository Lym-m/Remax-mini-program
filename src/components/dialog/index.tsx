import React from 'react';
import styles from './index.scss';
import VanDialog from '@vant/weapp/lib/dialog';
import clsx from 'clsx';

export interface DialogProps {
  show: boolean;
  children?: React.ReactNode | React.ReactNodeArray;
  className?: string;
  width?: string | number;
  title?: string;
  confirmButtonColor?: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonColor?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function Dialog(props: DialogProps): JSX.Element {
  const {
    confirmButtonColor = '#0072ff',
    confirmButtonText = '确定',
    showCancelButton = false,
    cancelButtonColor = '#898989',
    cancelButtonText = '取消',
    width = '270px',
  } = props;

  return (
    <VanDialog
      show={props.show}
      title={props.title}
      use-slot={!!props.children}
      width={width}
      class={clsx(styles.dialog, props.className)}
      confirm-button-color={confirmButtonColor}
      confirm-button-text={confirmButtonText}
      show-cancel-button={showCancelButton}
      cancel-button-color={cancelButtonColor}
      cancel-button-text={cancelButtonText}
      bind:confirm={props.onConfirm}
      bind:cancel	={props.onCancel}
    >
      {props.children}
    </VanDialog>
  );
}
