// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    defaultDate: {
      type: Number,
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    formatter(day){
      const week = day.date.getDay();
      if (week !== 2) {
        day.type = 'disabled';
      }
      if(day.date.getDate() === (new Date()).getDate()){
        day.type = 'disabled';
      }
      return day;
    },
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    selectTime(e) {
      this.triggerEvent('sync',e.detail);
    }
  }
});
