import React, {useMemo, useState} from 'react';
import {View} from 'remax/wechat';
import VanCell from '@vant/weapp/lib/cell';
import OptionSelectPopup, {OptionSelectPopupProps} from '@/components/option-select-popup';
import useFetchData from '@/hooks/use-fetch-data';

export type OptionSelectCellOptions<Value> = { text: string, value: Value }[]

type OptionSelectCellProps<Value> =
  Omit<OptionSelectPopupProps<Value>, 'show' | 'title' | 'options' | 'onCancel'> &
  {
    cellTitle: string;
    popupTitle?: string;
    options?: OptionSelectCellOptions<Value>; // options如果存在load则无效
    load?: () => Promise<OptionSelectCellOptions<Value>>; // load为返回options的异步函数
    border?: boolean;
    errorMessage?: string; // 错误信息的展示
    required?: boolean; // 是否展示必须输入的红色星号
    titleWidth?: number; // 传递给cell的title-width
    disabled?: boolean;
    onOpen?: () => void; // 选择弹框打开
    onClose?: () => void; // 选择弹框关闭
  } &
  ComponentStyleProps

/**
 * 单选或多选的cell，点击cell就可以弹出单选或多选窗。就是对option-select-popup的一层封装。
 */
export default function OptionSelectCell<Value extends string | number>(props: OptionSelectCellProps<Value>): JSX.Element {
  const {
    border = true,
    required = false,
    disabled = false,
  } = props;

  const [show, setShow] = useState(false);
  const state = useFetchData<() => Promise<OptionSelectCellOptions<Value>>>(async () => {
    let load: () => Promise<OptionSelectCellOptions<Value>>;
    if (props.options) {
      load = () => Promise.resolve(props.options as OptionSelectCellOptions<Value>);
    } else {
      load = props.load ?? (() => Promise.resolve([]));
    }
    return await load();
  }, [props.options]);

  const options = state.value ?? [];

  const valueText = useMemo(() => {
    let cellValue = '';
    if (props.multiple) {
      const len = (props.value as Value[]).length;
      cellValue = len > 0 ?`选中${len}个` : '';
    } else {
      const option = options.find(item => item.value === props.value);
      cellValue = option?.text ?? '';
    }
    return cellValue ? cellValue : `请选择${props.cellTitle}`;
  }, [options, props.cellTitle, props.multiple, props.value]);

  return (
    <View className={props.className}>
      <VanCell
        class={required ? 'required' : ''}
        title={props.cellTitle}
        title-width={props.titleWidth}
        clickable={!disabled}
        is-link border={border}
        bind:click={() => {
          if (disabled) return;
          setShow(true);
          props.onOpen?.();
        }}
      >
        <View>
          <View>{valueText}</View>
          <View style={{ color: 'var(--field-error-message-color,#ee0a24)', fontSize: 'var(--field-error-message-text-font-size,12px)' }}>
            {props.errorMessage}
          </View>
        </View>
      </VanCell>
      <OptionSelectPopup
        show={show}
        value={props.value}
        title={props.popupTitle}
        options={options}
        multiple={props.multiple}
        columns={props.columns}
        onChange={(v, extras) => {
          setShow(false);
          props.onChange?.(v, extras);
          props.onClose?.();
        }}
        onCancel={() => {
          setShow(false);
          props.onClose?.();
        }}
      />
    </View>
  );
}
