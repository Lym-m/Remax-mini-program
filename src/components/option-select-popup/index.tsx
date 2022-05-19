import React, {useState, useEffect, useMemo, useRef, useLayoutEffect} from 'react';
import {ScrollView, View} from 'remax/wechat';
import styles from './index.scss';
import clsx from 'clsx';
import VanCheckbox from '@vant/weapp/lib/checkbox';
import VanEmpty from '@vant/weapp/lib/empty';
import VanPicker from '@vant/weapp/lib/picker';
import {SelectPopup} from '@/components/select-popup';

// interface SingleProps<Value> {
//   value: Value;
//   onChange?: (value: Value, e?: { text: string; value: Value; }) => void
// }
//
// interface MultipleProps<Value> {
//   value: Value[];
//   onChange?: (value: Value[], e?: { text: string; value: Value; }) => void
// }
//
// type ExcludeProps<Value, Type> = Omit<BaseOptionSelectPopupProps<Value, Type>, 'onChange' | 'value'>
//
// interface BaseOptionSelectPopupProps<Value, Type> {
//   show: boolean;
//   value: Value | Value[];
//   type: Type;
//   title?: string;
//   options: { text: string; value: Value; }[];
//   onChange?: (value: Value | Value[], e?: { text: string; value: Value; }) => void
// }
//
// type OptionSelectPopupType<Value, Type extends 'multiple' | 'single'> = Pick<ExcludeProps<Value, Type>, 'type'> extends { type: 'multiple' }
//   ? ExcludeProps<Value, Type> & MultipleProps<Value>
//   : ExcludeProps<Value, Type> & SingleProps<Value>

type Options<Value> = { text: string, value: Value, children?: Options<Value> }[];

export interface OptionSelectPopupProps<Value> {
  show: boolean; // 是否显示选择popup
  value?: Value | Value[]; // 当前的选中值，如果为单选则为单个值，多选则为数组。
  multiple?: boolean; // 是否为多选，默认为false，multiple 优先级高于 column。
  columns?: boolean; // 是否为多列选择，就是级联选择。
  title?: string;
  options: Options<Value>; // 选项列表
  // 用户选择确认之后回调，如果为单选e则为选择的options中的item，多选则为选中的options。
  onChange?: (value: any /* Value | Value[] */, e?: any/* { text: string; value: Value; } | { text: string; value: Value; }[] */) => void;
  onCancel?: () => void;
}

/**
 * 选择弹窗，支持多选和单选，该组件为一个完全受控组件。内部选择状态在只在打开popup的选择过程中变化，在cancel之后会重置回外部value状态；
 * 在confirm之后会调用onChange请求变更状态。
 */
export default function OptionSelectPopup<Value extends string | number>(props: OptionSelectPopupProps<Value>): JSX.Element {
  const {
    show,
    value,
    multiple = false,
    columns = false,
    title = '请选择',
    options
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  // 用于存储picker change事件中的picker实例
  const picker = useRef<{ setIndexes: (indexes: number[]) => void }>();
  // 将option转为picker option的数据
  const cachedOptions = useMemo(() => {
    if (multiple || !columns) return options;
    // 多列的情况，但只有一列数据
    const values = Array.isArray(currentValue) ? currentValue : [currentValue];
    const newOptions = [];
    let curOptions: Options<Value> | undefined = options;
    for (let index = 0; curOptions; index++) {
      newOptions.push({ values: curOptions });
      const v = values[index];
      let res;
      if (v === undefined) {
        res = curOptions[0]?.children;
      } else {
        res = curOptions.find(({ value }) => value === v)?.children;
      }
      curOptions = res;
    }
    return newOptions;
  }, [columns, currentValue, multiple, options]);

  useLayoutEffect(() => {
    if (!picker.current || !columns) return;
    const v = currentValue ?? [];
    const values = (Array.isArray(v) ? v : [v]).concat([]); // 保证values为一个数组
    const indexes = values.map((v, i) => (cachedOptions[i] as {values: Options<Value>}).values.findIndex(({ value }) => value === v));
    if (indexes.length < cachedOptions.length) {
      for (let i = indexes.length; i < cachedOptions.length; i++) {
        indexes.push(0);
      }
    }
    // 延迟调用，因为picker的columns变更之后indexes会变化，延迟调用才能抵消indexes变化造成的影响。
    setTimeout(() => picker.current?.setIndexes(indexes), 0);
  }, [columns, currentValue, cachedOptions]);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const cancel = () => {
    setCurrentValue(value);
    props.onCancel?.();
  };
  const confirm = () => {
    let extras;
    let onChangeValue = currentValue;
    if (props.multiple) {
      // multiple 优先级最高优先处理
      const s = new Set(currentValue as Value[]);
      extras = props.options.filter(item => s.has(item.value));
    } else if (props.columns) {
      // 处理多列需要进行格式化，还未选择的列默认为0
      onChangeValue = onChangeValue ?? [];
      extras = []; // extras用于返回选中value对应的text
      const values = (Array.isArray(onChangeValue) ? onChangeValue : [onChangeValue]).concat([]);
      for (let i = 0; i < cachedOptions.length; i++) {
        const curOptions = (cachedOptions[i] as {values: Options<Value>}).values;
        if (values[i]) {
          const res = curOptions.find(({value}) => value === values[i]);
          extras.push(res?.text ?? '');
          continue;
        }
        // todo: 有没有可能存在第一列为空，第二列有数据的情况
        if (curOptions[0]) {
          values.push(curOptions[0].value);
          extras.push(curOptions[0].text);
        }
      }
      onChangeValue = values;
    } else {
      extras = props.options.find((item) => item.value === currentValue);
      // 查询点击confirm的时候currentValue是否存在，第一次打开不选择直接点击确定的场景
      const hasValue = options.some(item => item.value === currentValue);
      // 当不存在value并且options中存在多个数据，则直接帮用户选择第一个数据
      if (!hasValue && options.length) {
        onChangeValue = options[0].value;
        extras = options[0];
      }
    }
    setCurrentValue(value);
    props.onChange?.(onChangeValue, extras);
  };

  let selectItems: JSX.Element;
  if (multiple) {
    const valSet = new Set(currentValue as Value[]);
    const itemClick = (val: Value) => () => {
      if (valSet.has(val)) {
        setCurrentValue((currentValue as Value[]).filter(v => v !== val));
      } else {
        setCurrentValue([...(currentValue as Value[]), val]);
      }
    };
    selectItems = (
      <View className={clsx(styles.multiSelect)}>
        <ScrollView scrollY className={styles.scroll}>
          <View className={styles.scrollInner}>
            {options.map(item => {
              const active = Array.isArray(currentValue) &&
                valSet.has(item.value);
              return (
                <View key={item.value} className={styles.lineWrap} onClick={itemClick(item.value)}>
                  <View className={clsx(styles.label, active ? styles.active : '')}>
                    {item.text}
                  </View>
                  <VanCheckbox name={item.value} value={valSet.has(item.value)}/>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
    return (
      <SelectPopup
        show={show}
        title={title}
        catchTouchMove
        confirmClick={confirm}
        cancelClick={cancel}
      >
        {options.length === 0 ? <VanEmpty description="暂无数据"/> : selectItems}
      </SelectPopup>
    );
  } else {
    let currentIndex;
    if (columns) {
      currentIndex = null;
    } else {
      currentIndex = options.findIndex(item => item.value === currentValue);
      currentIndex = currentIndex >= 0 ? currentIndex : 0;
    }
    return (
      <SelectPopup
        show={show}
        title={title}
        catchTouchMove
        confirmClick={confirm}
        cancelClick={cancel}
      >
        <VanPicker
          default-index={currentIndex}
          columns={cachedOptions}
          bind:cancel={cancel}
          bind:confirm={confirm}
          bind:change={(e) => {
            picker.current = e.detail.picker;
            if (columns) {
              const index = e.detail.index ?? 0;
              setCurrentValue(e.detail.value.map((item: Options<Value>[number]) => item.value).slice(0, index + 1));
            } else {
              setCurrentValue(e.detail.value.value);
            }
          }}
        />
      </SelectPopup>
    );
  }
}
