import React, {useMemo, useState} from 'react';
import {Text, View} from 'remax/wechat';
import styles from './index.scss';
import VanRadio from '@vant/weapp/lib/radio';
import VanRadioGroup from '@vant/weapp/lib/radio-group';
import VanIcon from '@vant/weapp/lib/icon';
import OptionSelectPopup, {OptionSelectPopupProps} from '@/components/option-select-popup';
import clsx from 'clsx';
import {OptionSelectCellOptions} from '@/components/option-select-cell';
import useFetchData from '@/hooks/use-fetch-data';

type OptionalSelectCellProps<Value> =
  Omit<OptionSelectPopupProps<Value>, 'show' | 'title' | 'options'> &
  {
    title: string;
    options?: { text: string; value: Value; }[];
    load?: () => Promise<OptionSelectCellOptions<Value>>; // load为返回options的异步函数
    radioValue: boolean;
    onRadioChange?: (radio: boolean) => void;
    errorMessage?: string;
    disabled?: boolean;
  } &
  ComponentStyleProps

/**
 * 可选的选择cell，先选择是否需要，选择是才会暂时可选项，和option-select-cell类似。
 */
export default function OptionalSelectCell<Value extends string | number>(props: OptionalSelectCellProps<Value>): JSX.Element {
  const [show, setShow] = useState(false);
  // const radioValue = props.radioValue;
  const {
    radioValue,
    disabled = false
  } = props;

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
    if (props.multiple && Array.isArray(props.value) && props.value.length) {
      cellValue = `选中${props.value.length}个`;
    } else if (!props.multiple && props.value) {
      const item = options.find(item => item.value === props.value);
      cellValue = item?.text ?? '';
    }
    return cellValue || `请选择${props.title}`;
  }, [options, props.multiple, props.title, props.value]);

  return (
    <View className={clsx(styles.optionalSelectCell, props.className)} style={props.style}>
      <View className={styles.head}>{props.title}</View>
      <View className={styles.body}>
        <VanRadioGroup value={radioValue} bind:change={e => {
          props.onRadioChange?.(e.detail);
        }}>
          <View className={styles.rowRadio}>
            <VanRadio key="radio-false" disabled={disabled} name={false} class={styles.gutter} label-class={radioValue ? styles.inactiveRadio : ''}>不需要</VanRadio>
            <VanRadio key="radio-true" disabled={disabled} name={true} label-class={!radioValue ? styles.inactiveRadio : ''}>需要</VanRadio>
          </View>
        </VanRadioGroup>
        <View className={clsx(styles.selectText, radioValue ? '' : styles.hide)} onClick={() => setShow(true)}>
          <Text style={{ marginRight: '10px' }}>{valueText}</Text>
          <VanIcon name="arrow"/>
        </View>
      </View>
      <View className={styles.errorMessage}>{props.errorMessage}</View>
      <OptionSelectPopup
        show={show}
        multiple={props.multiple}
        value={props.value}
        options={options}
        title={props.title}
        onChange={(v, opts) => {
          setShow(false);
          props.onChange?.(v, opts);
        }}
        onCancel={() => setShow(false)}
      />
    </View>
  );
}
