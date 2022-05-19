import React, {useState, useEffect} from 'react';
import {SelectPopup} from '@/components/select-popup';
import VanCalendar from '@vant/weapp/lib/calendar';

interface Day {
  date: Date //	日期对应的 Date 对象
  type: string //	日期类型，可选值为selected、start、middle、end、disabled
  text: string //	中间显示的文字
  topInfo: string //	上方的提示信息
  bottomInfo: string //	下方的提示信息
}

export interface DateSelectProps {
  show: boolean;
  value: string;
  title?: string;
  onChange?: (value: any, e?: { text: string; value: string; }) => void;
  onCancel?: () => void;
  formatter?: (day: Day) => Day;
  children?: (value: string, selectTime: (e: any) => void) => React.ReactNode;
}

export default function DateSelect(props: DateSelectProps): JSX.Element {
  const {
    show,
    value,
    title = '选择时间',
  } = props;

  const [isSelect, setIsSelect] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const cancel = () => {
    setCurrentValue(value);
    props.onCancel?.();
  };
  const confirm = () => {
    const nowTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`;
    const onChangeValue = !isSelect ? nowTime : currentValue;
    setCurrentValue(value);
    props.onChange?.(onChangeValue);
  };

  const selectTime = (e: any) => {
    setIsSelect(true);
    const time = new Date(e.detail);
    const result = `${time.getFullYear()}-${(time.getMonth() + 1)}-${time.getDate()}`;
    setCurrentValue(result);
  };

  return (
    <SelectPopup
      show={show}
      title={title}
      confirmClick={confirm}
      cancelClick={cancel}
    >
      {
        props.children ? props.children(currentValue, selectTime) : (
          <VanCalendar
            poppable={false}
            default-date={new Date(value).getTime()}
            bind:select={selectTime}
            show-confirm={false}
          />
        )
      }
    </SelectPopup>
  );
}
