import { RuleItem, RuleType } from 'async-validator';

export function requiredValidatorRule(name: string, type?: RuleType, message?: string): RuleItem {
  return { type: type ?? 'string', required: true, message: message ?? `请输入${name}` };
}

export function maxValidatorRule(max: number, message?: string): RuleItem {
  return { type: 'string', max, message: message ?? `不超过${max}个字符` };
}

export function numberRule(option: {max?: number, min?: number, numberDecimal?: number}): RuleItem {
  const {
    max = Infinity,
    min = -Infinity,
    numberDecimal
  } = option;
  const decimalReg = numberDecimal === undefined ? '+' : `{0,${numberDecimal}}`;
  const reg = new RegExp(`^\\d+(\\.\\d${decimalReg})?$`);
  return {
    validator(rule, value: any, callback) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        callback('请输入数据');
        return;
      }
      const valueStr = value.toString();
      if (!reg.test(valueStr)) {
        callback('请输入数字' + (numberDecimal ? `并且不超过${numberDecimal}位数` : ''));
        return;
      }
      const valueNum = Number(valueStr);
      if (valueNum < min) {
        callback(`输入的数字小于${min}`);
        return;
      }
      if (valueNum > max) {
        callback(`输入的数字大于${max}`);
        return;
      }
      callback();
    }
  };
}
